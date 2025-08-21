import mongoose, { Schema, Document, model, Types } from "mongoose";

export interface IComment extends Document {
  name: string;
  email: string;
  body: string;
  score: number;
  date: Date;
  product: Types.ObjectId;
}

const commentSchema: Schema<IComment> = new Schema({
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
    required: true
  },
});

const CommentModel =
  mongoose.models.Comments || model<IComment>("Comment", commentSchema);

export default CommentModel;
