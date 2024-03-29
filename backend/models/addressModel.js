const mongoose = require("mongoose");
const addressSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String },
  mobileNum: { type: String },
  pinCode: { type: String },
  address: { type: String },
  town: { type: String },
  city: { type: String },
  state: { type: String },
  environment: { type: String },
  isSelected: { type: Boolean, default: "false" },
});
const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
