const productRouter = require('express').Router();
const { addProduct, getAllProducts } = require('../controllers/Product_controller/productController');
const authMiddleware = require('../middleware/authMiddleware');


//To add a new Product
productRouter.post("/add-product",authMiddleware,addProduct);


//To get all the products
productRouter.get('/get-all-products',authMiddleware,getAllProducts)

module.exports = productRouter;


