import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ GET route test
router.get("/", (req, res) => {
  res.send("✅ Upload API is working!");
});

// ✅ POST route (upload file to Cloudinary)
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "❌ Please upload a file" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
    });

    // Remove local file
    fs.unlinkSync(req.file.path);

    res.status(201).json({ message: "✅ File uploaded successfully!", url: result.secure_url });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
