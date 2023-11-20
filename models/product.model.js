const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  id: Number,
  gender: String,
  type: String,
  fabric: String,
  occation: String,
  size: Array,
  color: String,
  stock: Number,
  image: String,
  price: String,
  brand:String,

});
module.exports = mongoose.model("product_collection", productSchema);
