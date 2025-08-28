import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITickets extends Document {
  title: string;
  body: string;
  department: Types.ObjectId;
  subDepartment: Types.ObjectId;
  priority: number;
  user: Types.ObjectId;
  status: string
}

const schema: Schema<ITickets> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    subDepartment: {
      type: Schema.Types.ObjectId,
      ref: "SubDepartment",
      required: true,
    },
    priority: {
      type: Number,
      default: 2,
      enum: [1, 2, 3],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
      default: "OPEN",
    },
  },
  {
    timestamps: true,
  }
);

const TicketModel =
  mongoose.models.Ticket || mongoose.model<ITickets>("Ticket", schema);

export default TicketModel;
