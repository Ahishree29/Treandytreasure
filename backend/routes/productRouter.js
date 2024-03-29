const express = require("express");
const {
  getProducts,
  getProductsOffer,
  getProductById,
  getProductsbycategory,
} = require("../controllers/productController");

const router = express.Router();
router.route("/:query").post(getProducts);
router.route("/").post(getProductsbycategory);
router.route("/offer/:offer").post(getProductsOffer);
router.route("/productbyId/:id").post(getProductById);
module.exports = router;
