import { inngest } from "../client.js";
import Ticket from "../../models/ticket.js";
import User from "../../models/user.js";
import { NonRetriableError } from "inngest";
import { sendMail } from "../../utils/mailer.js";
import analyzeTicket from "../../utils/ai.js";

export const onTicketCreated = inngest.createFunction(
  { id: "on-ticket-created", retries: 2 },
  { event: "ticket/created" },
  async (ctx) => {

    const { event, step } = ctx;

    try {
      const { ticketId } = event.data;

      // Fetch ticket
      const ticket = await step.run("fetch-ticket", async () => {
        const ticketObject = await Ticket.findById(ticketId);
        if (!ticketObject) throw new NonRetriableError("Ticket not found");
        return ticketObject;
      });

      //  Set initial status
      await step.run("update-ticket-status", async () => {
        await Ticket.findByIdAndUpdate(ticket._id, { status: "TODO" });
      });

      //  Analyze ticket with AI
      const aiResponse = await analyzeTicket(ticket);
      console.log("AI Response Object:", aiResponse);

      const relatedSkills = await step.run("ai-processing", async () => {
        if (aiResponse) {
          await Ticket.findByIdAndUpdate(ticket._id, {
            priority: !["low", "medium", "high"].includes(aiResponse.priority)
              ? "medium"
              : aiResponse.priority,
            summary: aiResponse.summary,
            helpfulNotes: aiResponse.helpfulNotes,
            relatedSkills: aiResponse.relatedSkills,
          });
          return aiResponse.relatedSkills;
        }
        return [];
      });

      //  Assign moderator
      const moderator = await step.run("assign-moderator", async () => {
        const currentTicket = await Ticket.findById(ticket._id);

        // Skip reassignment if already assigned
        if (currentTicket.assignedTo) {
          console.log("Ticket already assigned, skipping reassignment");
          return await User.findById(currentTicket.assignedTo);
        }

        const normalizedSkills = relatedSkills.map(s => s.trim().toLowerCase());
        let user = await User.findOne({
          role: "moderator",
          skills: { $elemMatch: { $regex: normalizedSkills.join("|"), $options: "i" } },
        });

        if (!user) {
          user = await User.findOne({ role: "admin" });
        }

        //  Assign moderator, but don’t set status yet
        await Ticket.findByIdAndUpdate(ticket._id, { assignedTo: user?._id || null });
        return user;
      });

      //  Now safely set status → IN_PROGRESS
      await step.run("mark-in-progress", async () => {
        if (moderator?._id) {
          await Ticket.findByIdAndUpdate(ticket._id, { status: "IN_PROGRESS" });
        }
      });

      //  Send email
      await step.run("send-email-notification", async () => {
        const finalTicket = await Ticket.findById(ticket._id).populate("createdBy", "email");

        if (moderator?.email) {
          const creatorEmail = finalTicket.createdBy?.email || "no-reply@example.com";

          await sendMail(
            moderator.email,
            "Ticket Assigned",
            `A new ticket is assigned to you:

            Title: ${finalTicket.title}
            Description: ${finalTicket.description}
            Priority: ${finalTicket.priority}
            Summary: ${finalTicket.summary || "No summary available"}
            Helpful Notes: ${finalTicket.helpfulNotes || "No notes provided"}
            Related Skills: ${finalTicket.relatedSkills?.join(", ") || "N/A"}

            Please log in to the system to manage this ticket.`,
            creatorEmail 
            );
          }
        });

      return { success: true };
    } catch (err) {
      console.error(" Error running the step:", err.message);
      return { success: false };
    }
  }
);
