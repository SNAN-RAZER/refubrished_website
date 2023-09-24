const bidModel = require("../../models/bidModal");
const mongoose = require("mongoose");

// Place a Bid
const placeNewBid = async (req, res) => {
  try {
    const newBid = new bidModel(req.body);
    await newBid.save();
    return res.status(201).send({
      success: true,
      message: "Bid added successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

// Get all bids
const getAllBids = async (req, res) => {
  try {
    const { product, seller } = req.body;
    let filters = {};
    if (product) {
      filters.product = new mongoose.mongo.ObjectId(product);
    }
    if (seller) {
      filters.seller = new mongoose.mongo.ObjectId(seller);
    }

    console.log(filters);
    const bids = await bidModel
      .find(filters)
      .populate("product")
      .populate("seller")
      .populate("buyer");

    console.log(bids);

    return res.status(200).send({
      success: true,
      message: "Bids fetched successfully",
      data: bids,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

module.exports = {
  placeNewBid,
  getAllBids,
};
