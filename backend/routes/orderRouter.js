const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { placeOrder, getOrder } = require("../controllers/orderController");
const router = express.Router();
router.route("/").post(protect, placeOrder);
router.route("/").get(protect, getOrder);
module.exports = router;
