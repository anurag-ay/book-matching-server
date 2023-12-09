const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const mostSimilarVector = require("../utils/recommendationAlgo");

router.get("/", async (req, res) => {
  const vect = [0.4, 0.2];

  try {
    const books = await Book.find();
    const score = mostSimilarVector(vect, books);
    console.log(score.length);
    res.status(200).send(score);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
