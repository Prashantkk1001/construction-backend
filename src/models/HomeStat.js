import mongoose from "mongoose";
export default mongoose.model(
  "HomeStat",
  new mongoose.Schema({ key: String, value: String })
);
