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
