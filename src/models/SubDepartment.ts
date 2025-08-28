import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISubDepartment extends Document {
  title: string;
  department: Types.ObjectId;
}

const schema: Schema<ISubDepartment> = new Schema({
  title: {
    type: String,
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

const SubDepartmentModel =
  mongoose.models.SubDepartment || mongoose.model("SubDepartment", schema);

export default SubDepartmentModel;
