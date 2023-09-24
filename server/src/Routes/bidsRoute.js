const bidsRouter = require("express").Router();
const {
  placeNewBid,
  getAllBids,
} = require("../controllers/Bid_Controller/bid_controller");
const authMiddleware = require("../middleware/authMiddleware");

// Place a bid
bidsRouter.post("/place-new-bid", authMiddleware, placeNewBid);

//Get all bids
bidsRouter.post("/get-all-bids", authMiddleware, getAllBids);
module.exports = bidsRouter;
