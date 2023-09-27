const cors = require("cors");
const express = require("express");
const db = require("./config/dbConfig");
const userRouter = require("./Routes/userRoute");
const productRouter = require("./Routes/productsRoute");
const bidsRouter = require("./Routes/bidsRoute");
const notificationRouter = require("./Routes/notificationRoute");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/vl/api/users", userRouter);
app.use("/vl/api/products", productRouter);
app.use("/vl/api/bids", bidsRouter);
app.use("/vl/api/notifications", notificationRouter);

module.exports = app;
