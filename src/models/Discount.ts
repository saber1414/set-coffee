import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDiscount extends Document {
  code: string;
  maxUse: number;
  uses: number;
  percent: number;
  product: Types.ObjectId;
  usedBy: mongoose.Schema.Types.ObjectId[];
}

const schema: Schema<IDiscount> = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    maxUse: {
      type: Number,
      required: true,
    },
    uses: {
      type: Number,
      required: false,
      default: 0,
    },
    percent: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    usedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const DiscountsModel =
  mongoose.models.Discount || mongoose.model<IDiscount>("Discount", schema);

export default DiscountsModel;
