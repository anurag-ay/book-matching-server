const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

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
  // Check for existing student with same userName
  const student = await Student.findOne({
    userName: req.body.userName,
  });
  if (student) {
    return res
      .status(409)
      .send({ message: "User name address already exists." });
  }

  // Create and save new student
  let newStudent = new Student(req.body);
  newStudent.password = await bcrypt.hash(newStudent.password, 12);
  try {
    await newStudent.save();

    newStudent = _.pick(newStudent, ["_id", "userName", "name"]);
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

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) return res.status(400).send("Bad Request");

    let user = await Student.findOne({ userName: userName });
    if (!user)
      return res.status(404).send("User with this User Name dosen't Exist");

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) return res.status(403).send("Icorrect Password");

    user = _.pick(user, [
      "_id",
      "name",
      "userName",
      "personalityAnswers",
      "recommendedGenres",
      "personalityVector",
      "readBooks",
    ]);
    const token = jwt.sign(user, process.env.JWT_PRIVATE_KEY);
    res.status(200).send(token);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
