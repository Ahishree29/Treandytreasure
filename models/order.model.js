const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  userId: String,
  orderNumber: String,
  OrderedOn: String,
  costomerName: String,
  costomerEmail: String,
  costomerNumber: String,
  costomerAddress: String,
  totalPrice: Number,
  totalQuantity: Number,
  cartitem: Array,
});
module.exports = mongoose.model("order_collections", orderSchema);
