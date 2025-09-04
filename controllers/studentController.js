import Student from "../models/Student.js";

// Add student
export const addStudent = async (req, res) => {
  try {
    const { name, rollNumber } = req.body;

    if (!name || !rollNumber) {
      return res.status(400).json({ message: "Name and Roll Number are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const newStudent = new Student({
      name,
      rollNumber,
      photo: req.file.path, // Cloudinary URL
    });

    await newStudent.save();
    res.status(201).json({ message: "✅ Student created", student: newStudent });
  } catch (error) {
    console.error("❌ Error creating student:", error);
    res.status(500).json({ message: "❌ Error creating student" });
  }
};

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    res.status(500).json({ message: "❌ Error fetching students" });
  }
};
