const cors = require("cors");
const express = require("express");
const db = require("./config/dbConfig");
const userRouter = require("./Routes/userRoute");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use('/vl/api/users', userRouter);


module.exports = app;
