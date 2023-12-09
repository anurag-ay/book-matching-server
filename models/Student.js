const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  // Name and email address of the student
  name: { type: String, required: true },
  userName: { type: String, required: true },
  // Completed personality assessment questions
  personalityAnswers: [{ questionId: String, answer: String }],
  // Recommended book genres based on personality
  recommendedGenres: [String],
  // Personality vector derived from answers
  personalityVector: { type: Array },
  // Books read by the student (optional)
  readBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  password: { type: String, required: true },
});

module.exports = mongoose.model("Student", StudentSchema);
