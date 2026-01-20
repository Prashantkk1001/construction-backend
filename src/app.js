import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ===========================
   CORS CONFIG (IMPORTANT)
=========================== */
const allowedOrigins = [
   'http://localhost:8080',      // तुझा frontend port
    'http://localhost:5173',      // Vite default
    'http://localhost:3000',
  "https://rkconstruction.vercel.app",    // USER
  "https://rkconstruction-af.vercel.app",  // ADMIN
  "https://construction-backend-wtf2.onrender.com" // backend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server / Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ IMPORTANT for preflight
app.options("*", cors());

/* ===========================
   BODY PARSERS
=========================== */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ===========================
   STATIC UPLOADS
=========================== */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

/* ===== ADMIN ROUTES ===== */
import adminAuth from "./routes/admin/auth.routes.js";
import adminHome from "./routes/admin/home.routes.js";
import adminContact from "./routes/admin/contact.routes.js";
import adminProjects from "./routes/admin/project.routes.js";
import adminAbout from "./routes/admin/about.routes.js";
import adminEnquiries from "./routes/admin/enquiries.routes.js";
import adminServices from "./routes/admin/services.routes.js";
import adminUpload from "./routes/admin/upload.routes.js";

app.use("/api/admin/auth", adminAuth);
app.use("/api/admin/home", adminHome);
app.use("/api/admin/contact", adminContact);
app.use("/api/admin/services", adminServices);
app.use("/api/admin/projects", adminProjects);
app.use("/api/admin/about", adminAbout);
app.use("/api/admin/enquiries", adminEnquiries);
app.use("/api/admin/upload", adminUpload);

/* ===== PUBLIC ROUTES ===== */
import publicHome from "./routes/public/home.routes.js";
import publicContact from "./routes/public/contact.routes.js";
import publicServices from "./routes/public/services.routes.js";
import publicProjects from "./routes/public/projects.routes.js";
import publicAbout from "./routes/public/about.routes.js";
import publicEnquiry from "./routes/public/enquiry.routes.js";

app.use("/api/home", publicHome);
app.use("/api/contact", publicContact);
app.use("/api/services", publicServices);
app.use("/api/projects", publicProjects);
app.use("/api/about", publicAbout);
app.use("/api/enquiry", publicEnquiry);

/* ===== HEALTH CHECK ===== */
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    uploadEndpoint: "/api/admin/upload/images",
    staticUploads: "/uploads/<filename>",
    time: new Date().toISOString(),
  });
});

export default app;
