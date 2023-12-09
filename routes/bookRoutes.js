const express = require("express");
const router = express.Router();

// Define Book and Student models
const Book = require("../models/Book");

// Get all books
router.get("/", async (req, res) => {
  // await Book.deleteMany();
  // const books = items.books;
  // await Book.insertMany(books);
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get a specific book
router.get("/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).send({ message: `Book with ID ${bookId} not found` });
    } else {
      res.status(200).send(book);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Add a new book
router.post("/", async (req, res) => {
  const newBook = new Book(req.body);
  try {
    await newBook.save();
    res.status(201).send(newBook);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
