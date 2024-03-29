const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    category: { type: String, required: true },
    product_type: { type: String, required: true },
    item_category: { type: String },
    item_type: { type: String },
    fabric: { type: String },
    offer: { type: Number },
    section: { type: String },
    occasion: [{ type: String }],
    season: { type: String },
    price: { type: Number },
    age: [{ type: String }],
    size: [{ type: String }],
    color: [{ type: String }],
    brands: { type: String },
    images: { type: String },
    stock: { type: Boolean },
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Products = mongoose.model("Product", productSchema);
module.exports = Products;
