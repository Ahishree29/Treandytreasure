const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./db");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const stateRouter = require("./routes/stateRouter");
const commentRouter = require("./routes/commentRouter");
const cartRouter = require("./routes/cartRouter");
const addressRouter = require("./routes/addressRouter");
const orderRouter = require("./routes/orderRouter");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();
const app = express();
const corsOptions = {
  origin: "https://trendytresure.netlify.app",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => res.send("API is running"));
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/state", stateRouter);
app.use("/api/comment", commentRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, console.log(`server started on port ${PORT}`.yellow));
