const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");
const Address = require("../models/addressModel");
const Order = require("../models/orderModel");
const Products = require("../models/productModel");
const fs = require("fs").promises;
const path = require("path");
const nodemailer = require("nodemailer");
const placeOrder = asyncHandler(async (req, res) => {
  const { orderNum, totalprice } = req.body;
  try {
    const cartItems = await Cart.find({
      user: req.user._id,
      isSelected: true,
    });

    if (cartItems.length === 0) {
      return res
        .status(400)
        .json("There are no items to order. Please select items first.");
    }

    const deliveryAddress = await Address.find({
      userId: req.user._id,
      isSelected: true,
    });
    if (deliveryAddress.length === 0) {
      return res
        .status(400)
        .json("You haven't selected an address. Please select an address.");
    }
    const productIds = cartItems.map((item) => item.product);
    const size = cartItems.map((item) => item.selectedSize);
    const quantity = cartItems.map((item) => item.quantity);
    const customerNum = deliveryAddress.map((item) => item.mobileNum);
    const customerAds = deliveryAddress.map((item) => item.address);
    const product = await Products.find({ _id: { $in: productIds } });
    const orderedProducts = productIds.map((productId) =>
      product.find((p) => p._id.toString() === productId.toString())
    );
    const order = await Order.create({
      userId: req.user._id,
      orderItems: orderedProducts,
      orderAddress: deliveryAddress,
      orderedSize: size,
      orderedQuantity: quantity,
      orderedNumber: orderNum,
    });
    if (order) {
      await Cart.deleteMany({ user: req.user._id, isSelected: true });
      const emailTemplateFolderPath = path.resolve(
        __dirname,
        "..",
        "emailTemplate"
      );

    
      const welcomeLetterPath = path.join(
        emailTemplateFolderPath,
        "orderPlaced.html"
      );


      const htmlTemplate = await fs.readFile(welcomeLetterPath, "utf-8");
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "ahishree29@gmail.com",
          pass: "opxy wuma elig rklv",
        },
      });
      4;
      const mailOptions = {
        from: "heloise.sipes@ethereal.email",
        to: req.user.email,
        subject: "order Placed successfully",
        html: htmlTemplate
          .replace("{{customerName}}", req.user.name)
          .replace("{{orderNumber}}", orderNum)
          .replace("{{totalPrice}}", totalprice)
          .replace("{{totalQuantity}}", quantity)
          .replace("{{costomerAddress}}", customerAds)
          .replace("{{costomerNumber}}", customerNum),
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error", error);
        } else {
          console.log("Email Sent" + info.response);
        }
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

const getOrder = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
    
      .populate("orderAddress");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = { placeOrder, getOrder };
