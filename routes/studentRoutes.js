import express from "express";
import { addStudent, getStudents } from "../controllers/studentController.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// Multer Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "students", allowed_formats: ["jpg", "png", "jpeg"] },
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("photo"), addStudent);
router.get("/", getStudents);

export default router;
