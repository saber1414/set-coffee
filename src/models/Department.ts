import mongoose, { Schema, Document } from "mongoose";

export interface IDepartment extends Document {
  title: string;
}

const schema: Schema<IDepartment> = new Schema({
  title: {
    type: String,
    required: true,
  },
});

const DepartmentModel =
  mongoose.models.Department ||
  mongoose.model<IDepartment>("Department", schema);

export default DepartmentModel;
