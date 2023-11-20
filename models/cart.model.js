const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  id: String,
  brand: String,
  userId: String,
  gender: String,
  type: String,
  fabric: String,
  occation: String,
  size: Array,
  color: String,
  stock: Number,
  image: String,
  price: String,
  size: String,
  quantity: Number,
  totalPrice: Number,
});
module.exports = mongoose.model("cart_collection", cartSchema);
