import { axiosInstance } from "./axiosInstance";

//Add a new product
export const addProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:5001/vl/api/products/add-product",
      payload
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Get all the products
export const getAllProducts = async (filers) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:5001/vl/api/products/get-all-products",
      filers
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

//  Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `http://localhost:5001/vl/api/products/getProduct/${id}`
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

//Edit a product
export const editProduct = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `http://localhost:5001/vl/api/products/edit-product/${id}`,
      payload
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Delete a product

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `http://localhost:5001/vl/api/products/delete-product/${id}`
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Upload product Image
export const uploadProductImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `http://localhost:5001/vl/api/products/upload-image-to-product`,
      payload
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Update product status
export const updateProductStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `http://localhost:5001/vl/api/products//update-product-status/${id}`,
      { status }
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};
