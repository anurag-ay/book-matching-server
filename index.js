const express = require("express");
const app = express();
const mongoose = require("mongoose");

// built in Middleware
app.use(express.json());

// redirecting the urls to routes
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/book", require("./routes/bookRoutes"));
app.use("/api/recommend", require("./routes/recommend"));

// Connect to MongoDB
const mongoUri = "mongodb://localhost:27017/book-recommender";
mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to the mongoDB"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
