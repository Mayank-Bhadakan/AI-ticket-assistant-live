import { inngest } from "../inngest/client.js";
import Ticket from "../models/ticket.js";
import User from "../models/user.js";


export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const userId = req.user._id;

    // Find a moderator whose skills match the ticket description
    // Simple keyword match: moderator.skills includes any word in title/description
    const allModerators = await User.find({ role: "moderator" });
    let assignedModerator = null;

    for (const mod of allModerators) {
      const skillsLower = mod.skills.map(s => s.toLowerCase());
      const descriptionWords = description.toLowerCase().split(/\W+/);
      if (descriptionWords.some(word => skillsLower.includes(word))) {
        assignedModerator = mod;
        break;
      }
    }

    //  Fallback: if no moderator matches, assign to admin
    if (!assignedModerator) {
      assignedModerator = await User.findOne({ role: "admin" });
    }

    // Create ticket with assignedTo field
    const newTicket = await Ticket.create({
      title,
      description,
      createdBy: userId,
      assignedTo: assignedModerator ? assignedModerator._id : null,
    });

    await inngest.send({
      name: "ticket/created",
      data: {
        ticketId: newTicket._id.toString(),
        title,
        description,
        createdBy: userId.toString(),
      },
    });

    return res.status(201).json({
      message: "Ticket created and processing started",
      ticket: newTicket,
    });
  } catch (error) {
    console.error("Error creating ticket:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getTickets = async (req, res) => {
  try {
    const user = req.user;
    let tickets = [];

    if (user.role !== "user") {
      tickets = await Ticket.find({})
        .populate("assignedTo", ["email", "_id"])
        .sort({ createdAt: -1 });
    } else {
      tickets = await Ticket.find({ createdBy: user._id })
        .select("title description status createdAt")
        .sort({ createdAt: -1 });
    }
    return res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTicket = async (req, res) => {
  try {
    console.log("📩 Incoming getTicket request:", req.params.id);
    console.log("👤 Authenticated user:", req.user);

    const user = req.user;
    let ticket;

    if (user.role !== "user" || user.role == "user") {
      ticket = await Ticket.findById(req.params.id).populate("assignedTo", [
        "email",
        "_id",
      ]);
    } else {
      ticket = await Ticket.findOne({
        createdBy: user._id,
        _id: req.params.id,
      }).select("title description status createdAt");
    }

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    return res.status(200).json({ ticket });
  } catch (error) {
    console.error("Error fetching ticket", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
