import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected database successfully ✅");
  } catch (err: unknown) {
    console.error("error database connected ❌", err);
    throw new Error("Error database");
  }
};

export default connectDB;
