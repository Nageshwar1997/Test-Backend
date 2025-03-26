import mongoose from "mongoose";

// MongoDB Connection Cache
let cachedConnection: typeof mongoose | null = null;

const connectDB = async () => {
  if (cachedConnection) {
    console.log("Cached server connected to MongoDB");
    return cachedConnection;
  }
  console.log("process.env.MONGO_URI", process.env.MONGO_URI);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    cachedConnection = conn;
    console.log("New server connected to MongoDB");
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
