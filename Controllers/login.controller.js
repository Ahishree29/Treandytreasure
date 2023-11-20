const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const fs = require("fs").promises;
const Login = require("../models/login.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtkey = "e-com";
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());

router.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();

    const name = req.body.name;

    const email = req.body.email;
    const password = req.body.password;
    const hashedpassword = await bcrypt.hash(password, salt);
    if (!name && !email && !password) {
      return res.status(404).json({ error: "name or email not found" });
    } else {
      const existingUser = await Login.findOne({ email: email });

      if (existingUser) {
        console.log("already exist");
        return res
          .status(400)
          .json({ error: "Email already exists. Please log in." });
      }
      const loggedinuser = new Login({
        name: name,
        email: email,
        password: hashedpassword,
      });

      await loggedinuser.save();
      const token = jwt.sign(
        { id: loggedinuser._id, email: loggedinuser.email },
        jwtkey
      );
      loggedinuser.token = token;

      res.status(201).json({ loggedinuser: loggedinuser, token: token });

      const htmlTemplate = await fs.readFile("welcomeLetter.html", "utf-8");
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
          res.status(201).json({ status: 201, info });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logingin", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Both email and password are required" });
    }

    const user = await Login.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, jwtkey);
    const option = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res
      .status(200)
      .cookie("token".token, option)
      .json({ sucess: true, token: token, name: user.name, user_id: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
