const productRouter = require('express').Router();
const { addProduct, getAllProducts, editProduct, deleteProduct } = require('../controllers/Product_controller/productController');
const authMiddleware = require('../middleware/authMiddleware');


//To add a new Product
productRouter.post("/add-product", authMiddleware, addProduct);


//To get all the products
productRouter.get('/get-all-products', authMiddleware, getAllProducts)


//Edit a specific product
productRouter.put("/edit-product/:id", authMiddleware, editProduct);

//Edit a specific product
productRouter.delete("/delete-product/:id", authMiddleware, deleteProduct);

module.exports = productRouter;


