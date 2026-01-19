import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

// ✅ Load env variables
dotenv.config();

console.log("Mongo URI:", process.env.MONGO_URI); // DEBUG

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed", err);
  });
