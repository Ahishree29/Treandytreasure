const express = require("express");
const nodemailer = require("nodemailer");
const fs = require("fs").promises;
const router = express.Router();

const Order = require("../models/order.model");
const verification = require("./middleware");

router.post("/", verification, async (req, res) => {
  try {
    const neworder = req.body;
    console.log(neworder);
    const {
      OrderedOn,
      userId,
      orderNumber,
      costomerName,
      costomerEmail,
      costomerNumber,
      costomerAddress,
      totalPrice,
      totalquantity,
      cartitem,
    } = neworder;

    const email = costomerEmail;
    const order = new Order({
      orderNumber: orderNumber,
      OrderedOn: OrderedOn,
      userId: userId,
      costomerName: costomerName,
      costomerEmail: costomerEmail,
      costomerNumber: costomerNumber,
      costomerAddress: costomerAddress,
      totalPrice: totalPrice,
      totalquantity: totalquantity,
      cartitem: cartitem,
    });
    await order.save();

    res.status(201).json(order);
    const htmlTemplate = await fs.readFile("orderPlaced.html", "utf-8");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ahishree29@gmail.com",
        pass: "opxy wuma elig rklv",
      },
    });
    const mailOptions = {
      from: "heloise.sipes@ethereal.email",
      to: email,
      subject: "order Placed successfully",
      html: htmlTemplate
        .replace("{{customerName}}", costomerName)
        .replace("{{orderNumber}}", orderNumber)
        .replace("{{totalPrice}}", totalPrice)
        .replace("{{totalQuantity}}", totalquantity)
        .replace("{{costomerAddress}}", costomerAddress)
        .replace("{{costomerNumber}}", costomerNumber),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error", error);
      } else {
        console.log("Email Sent" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/:userId", verification, async (req, res) => {
  const id = req.params.userId;

  Order.find({ userId: id })
    .then((data) => {
      if (data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .json({ error: "No records with the given userId: " + id });
      }
    })
    .catch((err) => console.log(err));
});
module.exports = router;
