import mongoose, { Schema, Document } from "mongoose";

export interface IContactUs extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const schema: Schema<IContactUs> = new Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      minLength: 3,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContactUsModel =
  mongoose.models.ContactUs || mongoose.model("ContactUs", schema);

export default ContactUsModel;
