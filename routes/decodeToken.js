const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { token } = req.body;
  const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

  res.send(decodedToken);
});

module.exports = router;
