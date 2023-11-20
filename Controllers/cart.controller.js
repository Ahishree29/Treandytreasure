const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");
const verification = require("./middleware");
router.post("/", verification, async (req, res) => {
  try {
  
    const id = req.body.id;
    const userId = req.body.userId;
    const size = req.body.size;
    const qty = 1;

    if (!size) {
      return res.status(404).json({ error: "size or quantity not found" });
    } else {
      const product = await Product.findById(id);
     
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      const cartitem = await Cart.findOne({ userId, id, size });
    
      const {
        gender,
        type,
        fabric,
        occation,
        stock,
        color,
        image,
        price,
        brand,
      } = product;
      if (cartitem) {
        cartitem.quantity = cartitem.quantity + 1;

        await cartitem.save();
      } else {
        const cartItem = new Cart({
          id: id,
          brand: brand,
          userId: userId,
          gender: gender,
          type: type,
          fabric: fabric,
          occation: occation,
          price: price,
          color: color,
          stock: stock,
          image: image,
          size: size,
          quantity: qty,
          totalPrice: price,
        });

        await cartItem.save();
      }
      res.status(201).json(cartitem);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:userId", verification, async (req, res) => {
  const user = req.params.userId;

  Cart.find({ userId: user })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

router.delete("/:userId/:productId", verification, async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
   
    
    const cartItem = await Cart.findOne({ userId, _id: productId });
  
    if (!cartItem) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }

 
    await Cart.findByIdAndDelete(cartItem._id);

    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put(
  "/updateQuantity/:userId/:productId",
  verification,
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;
      const quantity = req.body.quantity; 
    

      
      const cartItem = await Cart.findOne({ userId, _id: productId });

      if (!cartItem) {
        return res.status(404).json({ error: "Product not found in the cart" });
      }

     
      cartItem.quantity = quantity;
      cartItem.totalPrice = Number(cartItem.price) * cartItem.quantity;
      await cartItem.save();

      res.status(200).json(cartItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
