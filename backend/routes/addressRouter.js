const express = require("express");
const {
  addAddress,
  getAddress,
  updateaddress,
  selectaddress,
  deleteAddress,
  getSelectedAddress,
} = require("../controllers/addressController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
router.route("/").post(protect, addAddress);
router.route("/").get(protect, getAddress);
router.route("/:id").put(protect, updateaddress);
router.route("/select/:addressId").put(protect, selectaddress);
router.route("/:addressId").delete(protect, deleteAddress);
router.route("/select").get(protect, getSelectedAddress);
module.exports = router;
