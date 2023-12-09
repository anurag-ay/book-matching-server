require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// built in Middleware
app.use(express.json());
app.use(cors());

// redirecting the urls to routes
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/book", require("./routes/bookRoutes"));
app.use("/api/recommend", require("./routes/recommend"));
app.use("/api/decodeToken", require("./routes/decodeToken"));

// Connect to MongoDB
const mongoUri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.o71ozfs.mongodb.net/?retryWrites=true&w=majority/book-recommender`;
mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to the mongoDB"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
