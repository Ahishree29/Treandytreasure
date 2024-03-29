const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../generateToken");
const fs = require("fs").promises;
const path = require("path");
const nodemailer = require("nodemailer");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const emailFound = await User.findOne({ email: email });
  if (emailFound) {
    res.status(400);
    throw new Error("Email already registered");
  }

  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });

  if (user) {
    const emailTemplateFolderPath = path.resolve(
      __dirname,
      "..",
      "emailTemplate"
    );

  
    const welcomeLetterPath = path.join(
      emailTemplateFolderPath,
      "welcomeLetter.html"
    );

  
    const htmlTemplate = await fs.readFile(welcomeLetterPath, "utf-8");
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
      subject: "Welcome to Trendy Treasure",
      html: htmlTemplate.replace("{{customerName}}", name),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error", error);
      } else {
        console.log("Email Sent" + info.response);
      }
    });

  
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Registration failed");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user?.matchPassword(password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    console.log("login failed");
    throw new Error("Invali d Email or Password");
  }
});
module.exports = { registerUser, authUser };
