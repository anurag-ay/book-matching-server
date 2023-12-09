require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// built in Middleware
app.use(express.json());

// setting cors
const corsOptions = {
  origin: ["https://anuragbookrecommendation.netlify.app"],
  methods: ["GET", "PUT", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

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

// add home route
app.get("/", (req, res) => {
  res.send("This is Home");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
