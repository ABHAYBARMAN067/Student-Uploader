import cloudinary from "../config/cloudinary.js";
import Student from "../models/Student.js";
import fs from "fs";

export const uploadStudent = async (req, res) => {
  try {
    const { name, roll } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "❌ Please upload a photo" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "students",
    });

    // Create new student entry
    const student = new Student({
      name,
      roll,
      photo: result.secure_url,
    });

    await student.save();

    // Remove local file after upload
    fs.unlinkSync(req.file.path);

    res.status(201).json({ message: "✅ Student added successfully!", student });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
