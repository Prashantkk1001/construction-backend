import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ================= STATIC FILES ================= */
app.use("/uploads", express.static("uploads"));

/* ===== ADMIN ROUTES ===== */
import adminAuth from "./routes/admin/auth.routes.js";
import adminHome from "./routes/admin/home.routes.js";
import adminContact from "./routes/admin/contact.routes.js";
import adminProjects from "./routes/admin/project.routes.js";
import adminAbout from "./routes/admin/about.routes.js";
import adminEnquiries from "./routes/admin/enquiries.routes.js";
import adminServices from "./routes/admin/services.routes.js";
// Replace the adminUpload import line with:
import adminUpload from "./routes/admin/upload.routes.js";


/* ===== PUBLIC ROUTES ===== */
import publicHome from "./routes/public/home.routes.js";
import publicContact from "./routes/public/contact.routes.js";
import publicServices from "./routes/public/services.routes.js";
import publicProjects from "./routes/public/projects.routes.js";
import publicAbout from "./routes/public/about.routes.js";
import publicEnquiry from "./routes/public/enquiry.routes.js";

/* ===== USE ROUTES ===== */
app.use("/api/admin/auth", adminAuth);
app.use("/api/admin/home", adminHome);
app.use("/api/admin/contact", adminContact);
app.use("/api/admin/services", adminServices);
app.use("/api/admin/projects", adminProjects);
app.use("/api/admin/about", adminAbout);
app.use("/api/admin/enquiries", adminEnquiries);
app.use("/api/admin/upload", adminUpload);

app.use("/api/home", publicHome);
app.use("/api/contact", publicContact);
app.use("/api/services", publicServices);
app.use("/api/projects", publicProjects);
app.use("/api/about", publicAbout);
app.use("/api/enquiry", publicEnquiry);

export default app;
