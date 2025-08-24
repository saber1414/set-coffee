import mongoose, { Schema, Document, Types } from "mongoose";

export interface IWishlist extends Document {
  user: Types.ObjectId;
  product: Types.ObjectId;
}

const schema: Schema<IWishlist> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
},
{
    timestamps: true
}
);

schema.index({ user: 1, product: 1 }, { unique: true });

const WishlistModel =
  mongoose.models.Wishlist || mongoose.model<IWishlist>("Wishlist", schema);

export default WishlistModel;
