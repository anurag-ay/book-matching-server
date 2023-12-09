const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Student = require("../models/Student");
const mostSimilarVector = require("../utils/recommendationAlgo");

router.post("/", async (req, res) => {
  const { personalityVector, userName } = req.body;

  const books = await Book.find();
  const score = mostSimilarVector(personalityVector, books);
  const scoreBook = [];

  for (let book of score) {
    scoreBook.push(book._id);
  }
  const genres = score[0].genre.split(",").map((genre) => genre.trim());
  const updateData = {
    recommendedGenres: genres,
    personalityVector: personalityVector,
    readBooks: scoreBook,
  };
  // const student = await Student.findOneAndUpdate(
  //   { userName: userName },
  //   updateData,
  //   { new: true }
  // );
  // student.genre = genres;
  // student.personalityVector = personalityVector;
  // student.readBooks = scoreBook;

  res.status(200).send(score);
});

module.exports = router;
