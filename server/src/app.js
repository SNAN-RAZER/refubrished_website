const cors = require("cors");
const express = require("express");
const db = require("./config/dbConfig");
const userRouter = require("./Routes/userRoute");
const productRouter = require("./Routes/productsroute");
const bidsRouter = require("./Routes/bidsRoute");
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

module.exports = app;
