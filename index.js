import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";

import studentRoutes from "./routes/studentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for frontend
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/upload", uploadRoutes);

// --- MongoDB Connect ---
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error(" MongoDB URI is missing in .env file");
  process.exit(1);
}

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB Atlas connected successfully!"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// --- Cloudinary Connect ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
