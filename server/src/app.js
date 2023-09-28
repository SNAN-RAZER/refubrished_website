const cors = require("cors");
const path = require("path");
const express = require("express");
const db = require("./config/dbConfig");
const userRouter = require("./Routes/userRoute");
const productRouter = require("./Routes/productsRoute");
const bidsRouter = require("./Routes/bidsRoute");
const notificationRouter = require("./Routes/notificationRoute");
const app = express();
app.use(express.static(path.join(__dirname, "..", "public")));
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

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/", "index.html"));
});
module.exports = app;
