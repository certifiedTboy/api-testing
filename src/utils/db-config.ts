import mongoose from "mongoose";
import { DB_URI } from "../lib/constants/index";

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connected successfully");
  } catch (error: unknown) {
    console.log(error);
  }
};

export { connectDb };
