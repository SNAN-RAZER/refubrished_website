const productModel = require("../../models/ProductModel");
const cloudinary_js_config = require("../../config/cloudinaryConfig");

//Add a new product
const addProduct = async (req, res) => {
  try {
    const newProduct = new productModel(req.body);
    await newProduct.save();
    return res.status(201).send({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

//Get all products

const getAllProducts = async (req, res) => {
  try {
    const { seller, categories = [], age = [], status } = req.body;
    let filters = {};
    if (seller) {
      filters.seller = seller;
    }
    if (status) {
      filters.status = status;
    }
    const products = await productModel
      .find(filters)
      .populate("seller")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      message: "Products fetched successfully",
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

//   Get a product By ID

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id).populate("seller");
    return res.status(200).send({
      message: "Product fetched successfully",
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};
//Edit a product

const editProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.status(204).send({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

//Delete the product

const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error}`,
    });
  }
};

// Upload image

const uploadImage = async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary_js_config.uploader.upload(
      req.file.path,
      {
        folder: "MP",
      },
      function (error, result) {
        console.log(result, error);
      }
    );

    const productId = req.body.productId;
    await productModel.findByIdAndUpdate(productId, {
      $push: { images: result.secure_url },
    });

    return res.status(201).send({
      success: true,
      message: "Image upload successfully",
      data: result.secure_url,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { status } = req.body;
    await productModel.findByIdAndUpdate(req.params.id, { status });

    return res.status(201).send({
      success: true,
      message: "Product status updated successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
  uploadImage,
  updateProduct,
  getProductById,
};
