const cors = require("cors");
const express = require("express");
const db = require("./config/dbConfig");
const userRouter = require("./Routes/userRoute");
const productRouter = require("./Routes/productsroute");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use('/vl/api/users', userRouter);
app.use('/vl/api/products', productRouter);



module.exports = app;
