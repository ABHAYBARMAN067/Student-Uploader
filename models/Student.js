import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: Number, required: true }, // rollNumber instead of roll
  photo: { type: String, required: true },
});

export default mongoose.model("Student", studentSchema);
