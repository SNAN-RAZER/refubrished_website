const productModel = require("../../models/ProductModel");

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

const getAllProducts = async (req, res)=>{
    try {
        const products = await productModel.find();
        return res.status(200).send({
            message:"Products fetched successfully",
            success:true,
            products
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:`Error ${error.message}`
        })
    }
};

//Edit a product

const editProduct = async(req, res)=>{
    try {
        const product = await productModel.findByIdAndUpdate(req.params.id, req.body);
        return res.status(204).send({
            success: true,
            message:"Product updated successfully"
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message:`Error ${error.message}`
        })
    }
};

//Delete the product

const deleteProduct = async (req, res)=>{
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Product deleted successfully"
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message:`Error ${error}`
        })
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    editProduct,
    deleteProduct
}
