const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtkey = "e-com";

router.post("/", (req, res) => {
  try {
    const expiredToken = jwt.sign({}, jwtkey, { expiresIn: "0s" });

    res.status(200).json({ success: true, token: expiredToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
