import { axiosInstance } from "./axiosInstance";


//Add a new product
export const addProduct = async (payload)=>{
    try {
        const response = await axiosInstance.post(
            "http://localhost:5000/vl/api/products/add-product",
            payload
        );

        return response.data;
    } catch (error) {
        return error.message;
    }
};


// Get all the products
export const getAllProducts = async () =>{
    try {
        const response = await axiosInstance.get(
            "http://localhost:5000/vl/api/products/get-all-products"
            
        );

        return response.data;
    } catch (error) {
        return error.message;
    }
}