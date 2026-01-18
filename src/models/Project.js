import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    section: {
      type: String,
      enum: [
        "Residential",
        "Interior",
        "3D Plan",
        "Line Plan",
        "Commercial",
        "Infrastructure",
      ],
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
