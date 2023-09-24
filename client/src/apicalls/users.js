const { axiosInstance } = require("./axiosInstance");

//Register user
export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:5000/vl/api/users/register", //URL
      payload //req.body
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//User Login
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:5000/vl/api/users/login", //URL
      payload //req.body
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};


//Get user data
export const getCurrentUser = async () =>{
  try {
    const response = await axiosInstance.get(
      "http://localhost:5000/vl/api/users/get-User-data", //URL
     
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}

// Get all users
export const getAllUsers = async () =>{
  try {
    const response = await axiosInstance.get(
      "http://localhost:5000/vl/api/users/get-all-users", //URL
     
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}

// Update an user
export const updateUserStatus = async (id, status) =>{
  try {
    const response = await axiosInstance.put(
      `http://localhost:5000/vl/api/users/update-user-status/${id}`, //URL
      {status}
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}