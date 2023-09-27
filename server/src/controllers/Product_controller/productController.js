const userModel = require("../../models/userModel");
const productModel = require("../../models/ProductModel");
const notificationModel = require("../../models/notificationModel");
const cloudinary_js_config = require("../../config/cloudinaryConfig");

//Add a new product
const addProduct = async (req, res) => {
  try {
    const newProduct = new productModel(req.body);
    await newProduct.save();

    //Send notifications to admin
    const admins = await userModel.find({ role: "admin" });
    admins.forEach(async (admin) => {
      const newNotification = await Notification({
        user: admin._id,
        message: `New Product added by ${req.user.username}`,
        title: "New Product",
        link: "/admin",
      });

      await newNotification.save();
    });
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
    const { seller, category = [], age = [], status, productName } = req.body;
    let filters = {};
    if (seller) {
      filters.seller = seller;
    }
    if (status) {
      filters.status = status;
    }
    // Filter by category
    if (category.length > 0) {
      filters.category = { $in: category };
    }

    // Filter By age

    if (age.length > 0) {
      age.forEach((item) => {
        const fromAge = item.split("-")[0];
        const toAge = item.split("-")[1];
        filters.age = { $gte: fromAge, $lte: toAge };
      });
    }

    // Filter by productName

    // # Usage of $regex operator
    // db.student.find({"email":{$regex:"gmail.com"}});

    if (productName) {
      filters.name = { $regex: `${productName}` };
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
    const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, {
      status,
    });

    //  Send notification to seller

    const newNotification = new notificationModel({
      user: updatedProduct.seller,
      message: `Your product ${updatedProduct.name} has been ${status}`,
      title: "Product status updated",
      onClick: "/profile",
    });
    await newNotification.save();
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
