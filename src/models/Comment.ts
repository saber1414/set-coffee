import mongoose, { Schema, Document, model, Types } from "mongoose";

export interface IComment extends Document {
  name: string;
  email: string;
  body: string;
  score: number;
  date: Date;
  product: Types.ObjectId;
  isReplied: boolean;
  replyBody: string;
  replyAuthor: string;
  isRejected: boolean;
  isAccept: boolean;
}

const schema: Schema<IComment> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    immutable: false,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  isReplied: {
    type: Boolean,
    default: false,
  },
  replyBody: {
    type: String,
    default: "",
  },
  replyAuthor: {
    type: String,
    default: "",
  },
  isRejected: {
    type: Boolean,
    default: false,
  },
  isAccept: {
    type: Boolean,
    default: false
  }
});

const CommentModel =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", schema);

export default CommentModel;
