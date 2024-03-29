const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");
const addToCart = asyncHandler(async (req, res) => {
  const { productId, size } = req.body;
  const userId = req.user._id;

  // Attempt to find a cart item matching the product ID, user ID, and size
  const addedToCart = await Cart.findOne({
    product: productId,
    user: userId,
    selectedSize: size,
  });

  if (addedToCart) {
    // Increment the quantity of the existing cart item
    await Cart.findOneAndUpdate(
      {
        product: productId,
        user: userId,
        selectedSize: size,
      },
      { $inc: { quantity: 1 } } // Correctly increment the 'quantity' field
    );

    const itemCount = await Cart.countDocuments({
      $and: [
        { user: userId },
        { product: { $exists: true } }, // Check if product exists
      ],
    });
    // It's generally not good practice to throw an error for a non-error condition
    // Instead, you might return a response indicating success
    return res
      .status(200)
      .json({ message: "Quantity increased by one", itemCount: itemCount });
  }

  // If the product does not exist in the cart, create a new cart item with quantity set to 1
  const addToCart = await Cart.create({
    product: productId,
    user: userId,
    selectedSize: size,
    quantity: 1, // Assuming your Cart schema has a 'quantity' field
  });

  if (addToCart) {
    res.status(200).json(addToCart);
  } else {
    // Handle the case where the cart item could not be created
    res.status(400).json({ message: "Unable to add item to cart" });
  }
});

const getCartItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    // Assuming Cart model has a 'products' field to store product IDs
    const cartItem = await Cart.find({ user: userId }).populate({
      path: "product",
      // Exclude the 'size' field from the populated product documents
    });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json(cartItem);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching the cart item" });
  }
});

const updateCart = asyncHandler(async (req, res) => {
  const { size, quantity, cartId } = req.body;

  const userId = req.user._id;

  try {
    // Assuming Cart model has a 'products' field to store product IDs
    const cartItem = await Cart.findOneAndUpdate(
      {
        user: userId,
        _id: cartId,
      },
      { $set: { selectedSize: size, quantity: quantity } }
    );
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json(cartItem);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching the cart item" });
  }
});
const deleteCartItem = asyncHandler(async (req, res) => {
  const { cartId } = req.params;
  const userId = req.user._id;

  try {
   
    const cartItem = await Cart.findOneAndDelete({
      user: userId,
      _id: cartId,
    });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json(cartItem);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching the cart item" });
  }
});
const updateIsSelect = asyncHandler(async (req, res) => {
  const { cartId } = req.body;
  const userId = req.user._id;

  try {

    const cartItem = await Cart.findOne({ user: userId, _id: cartId });

 
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

  
    const updatedCartItem = await Cart.findOneAndUpdate(
      { user: userId, _id: cartId },
      { $set: { isSelected: !cartItem.isSelected } },
      { new: true } 
    );

    res.status(200).json(updatedCartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});
const getSelectedCartItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    
    const cartItem = await Cart.find({
      user: userId,
      isSelected: true,
    }).populate({
      path: "product",

     
    });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json(cartItem);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching the cart item" });
  }
});
const deleteSelectedCartItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    
    const deletedItems = await Cart.deleteMany({
      user: userId,
      isSelected: true,
    });

    if (deletedItems.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No cart items found for deletion" });
    }

    res.status(200).json({ message: "Cart items deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong while deleting cart items" });
  }
});
const getCartCount = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
   
    const itemCount = await Cart.countDocuments({
      $and: [
        { user: userId },
        { product: { $exists: true } }, 
      ],
    });

    res.status(200).json(itemCount);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong while deleting cart items" });
  }
});
module.exports = {
  addToCart,
  getCartItem,
  updateCart,
  deleteCartItem,
  updateIsSelect,
  getSelectedCartItem,
  deleteSelectedCartItem,
  getCartCount,
};
