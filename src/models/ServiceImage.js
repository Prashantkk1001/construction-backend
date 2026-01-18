import mongoose from "mongoose";

const ServiceImageSchema = new mongoose.Schema(
  {
    residential: String,
    commercial: String,
    renovation: String,
    interior: String,
    infrastructure: String,
  },
  { timestamps: true }
);

export default mongoose.model("ServiceImage", ServiceImageSchema);
