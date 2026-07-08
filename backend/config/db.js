import mongoose from "mongoose";


const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
// src/config/index.js

export const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

export default connectDB;
