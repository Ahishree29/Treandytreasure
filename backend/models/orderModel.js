const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderItems: { type: Array },

    orderAddress: { type: Array },
    orderedSize: [{ type: String }],
    orderedQuantity: [{ type: Number }],
    orderedNumber: { type: Number },
  },

  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
