const productRouter = require("express").Router();
const {
  addProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
  uploadImage,
  updateProduct,
  getProductById,
} = require("../controllers/Product_controller/productController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");

//To add a new Product
productRouter.post("/add-product", authMiddleware, addProduct);

//To get all the products
productRouter.post("/get-all-products", authMiddleware, getAllProducts);

//To get all the products
productRouter.get("/getProduct/:id", authMiddleware, getProductById);

//Edit a specific product
productRouter.put("/edit-product/:id", authMiddleware, editProduct);

//Edit a specific product
productRouter.delete("/delete-product/:id", authMiddleware, deleteProduct);

//Get image from PC
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
//Handle Image upload to cloudinary
productRouter.post(
  "/upload-image-to-product",
  authMiddleware,
  multer({ storage: storage }).single("file"),
  uploadImage
);

// Update Product status
productRouter.put("/update-product-status/:id", authMiddleware, updateProduct);

module.exports = productRouter;
