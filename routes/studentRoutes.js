const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("readBooks");
    res.status(200).send(students);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get a specific student
router.get("/:studentId", async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const student = await Student.findById(studentId).populate("readBooks");
    if (!student) {
      res
        .status(404)
        .send({ message: `Student with ID ${studentId} not found` });
    } else {
      res.status(200).send(student);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  // Check for existing student with same email
  const existingStudent = await Student.findOne({
    userName: req.body.userName,
  });
  if (existingStudent) {
    return res
      .status(409)
      .send({ message: "User name address already exists." });
  }

  // Create and save new student
  const newStudent = new Student(req.body);
  try {
    await newStudent.save();
    res.status(201).send(newStudent);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Update a student's personality answers and recommended genres
router.put("/:studentId/personality", async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const student = await Student.findByIdAndUpdate(studentId, {
      personalityAnswers: req.body.answers,
      recommendedGenres: req.body.recommendedGenres,
    });
    if (!student) {
      res
        .status(404)
        .send({ message: `Student with ID ${studentId} not found` });
    } else {
      res.status(200).send(student);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Add a book to a student's read books list
router.post("/:studentId/read-books/:bookId", async (req, res) => {
  const studentId = req.params.studentId;
  const bookId = req.params.bookId;
  try {
    const student = await Student.findByIdAndUpdate(studentId, {
      $push: { readBooks: bookId },
    });
    if (!student) {
      res
        .status(404)
        .send({ message: `Student with ID ${studentId} not found` });
    } else {
      res.status(200).send(student);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Remove a book from a student's read books list
router.delete("/:studentId/read-books/:bookId", async (req, res) => {
  const studentId = req.params.studentId;
  const bookId = req.params.bookId;
  try {
    const student = await Student.findByIdAndUpdate(studentId, {
      $pull: { readBooks: bookId },
    });
    if (!student) {
      res
        .status(404)
        .send({ message: `Student with ID ${studentId} not found` });
    } else {
      res.status(200).send(student);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
