const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const connectdb = require("./db.js");
const productrouter = require("./Controllers/product.controller.js");
const cartrouter = require("./Controllers/cart.controller.js");
const loginrouter = require("./Controllers/login.controller.js");
const orderrouter = require("./Controllers/order.controller.js");
const logoutrouter = require("./Controllers/logout.controller.js");
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use("/api/products", productrouter);
app.use("/api/cart", cartrouter);
app.use("/api/login", loginrouter);
app.use("/api/order", orderrouter);
app.use("/api/logout", logoutrouter);
connectdb()
  .then(() => {
    console.log("db connection sucessful");
    app.listen(5000, () => console.log("server started at 5000"));
  })
  .catch((err) => console.log(err));
