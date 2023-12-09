const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  // Title and author of the book
  title: { type: String, required: true },
  author: { type: String, required: true },
  // Genre and description of the book
  genre: { type: String, required: true },
  description: { type: String },
  // Vector representation of book characteristics (optional)
  vector: { type: Array },
  imageUrl: { type: String },
});

module.exports = mongoose.model("Book", BookSchema);
