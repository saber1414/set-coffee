import mongoose, { Schema, Document, Types, model } from "mongoose";

export interface IProduct extends Document {
  title: string;
  slug: string;
  price: number;
  rating: number;
  shortDescription: string;
  description: string;
  stock: number;
  category: string;
  comments: Types.ObjectId[];
  tags: string[];
  details: Record<string, string>;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const schema: Schema<IProduct> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },
    shortDescription: {
      type: String,
      maxlength: 2000,
    },
    description: {
      type: String,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    images: {
      type: [String],
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    details: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.models.Product || model<IProduct>("Product", schema);

export default ProductModel;
