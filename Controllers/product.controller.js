const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const verification = require("./middleware");

router.get("/", (req, res) => {
  Product.find()
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

router.get("/:gender", (req, res) => {
  const gender = req.params.gender;

  Product.find({ gender: gender })
    .then((data) => {
      if (data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .json({ error: "No records with the given gender: " + gender });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
