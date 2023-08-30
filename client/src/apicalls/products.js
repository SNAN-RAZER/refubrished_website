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
};

//Edit a product
export const editProduct = async(id, payload)=>{
    try {
        const response = await axiosInstance.put(
            `http://localhost:5000/vl/api/products/edit-product/${id}`,
            payload
        );

        return response.data;
    } catch (error) {
        console.log(error)
        return error.message;
    }

};


// Delete a product

export const deleteProduct = async (id)=>{
    try {
        const response = await axiosInstance.delete(
            `http://localhost:5000/vl/api/products/delete-product/${id}`,
            
        );

        return response.data;
    } catch (error) {
        console.log(error)
        return error.message;
    }
}