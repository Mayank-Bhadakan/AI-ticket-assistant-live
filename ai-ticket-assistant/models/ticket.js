// models/ticket.js
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    // status enumeration (adjust labels if you use different ones in UI)
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE", "CLOSED"],
      default: "TODO",
    },

    // link to the user who created the ticket (required)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // index for fast queries by user
    },

    // person assigned to the ticket (can be null)
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // AI fields
    summary: { type: String, default: null },
    helpfulNotes: { type: String, default: null },
    relatedSkills: { type: [String], default: [] },

    // priority with limited values
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },

    deadline: { type: Date, default: null },
  },
  {
    timestamps: true, // createdAt, updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model("Ticket", ticketSchema);
