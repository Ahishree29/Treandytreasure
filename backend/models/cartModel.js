const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  selectedSize: { type: String },
  quantity: { type: Number },

  isSelected: { type: Boolean, default: false },
});
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
