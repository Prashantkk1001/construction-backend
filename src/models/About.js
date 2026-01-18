import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    constructionInfo: {
      name: String,
      description: String,
      image: String,
    },
    ownerInfo: {
      name: String,
      description: String,
      image: String,
      phone: String,
      email: String,
      location: String,
    },
    projectInfo: {
      completedProjects: Number,
      happyClients: Number,
      experienceYears: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("About", AboutSchema);
