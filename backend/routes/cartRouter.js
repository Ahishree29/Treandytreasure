const express = require("express");
const {
  addToCart,
  getCartItem,
  updateCart,
  deleteCartItem,
  updateIsSelect,
  getSelectedCartItem,
  deleteSelectedCartItem,
  getCartCount,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
router.route("/").post(protect, addToCart);
router.route("/").get(protect, getCartItem);
router.route("/").put(protect, updateCart);
router.route("/isSelect").put(protect, updateIsSelect);
router.route("/:cartId").delete(protect, deleteCartItem);
router.route("/deleteSelected").delete(protect, deleteSelectedCartItem);
router.route("/isSelect").get(protect, getSelectedCartItem);
router.route("/getCount").get(protect, getCartCount);
module.exports = router;
