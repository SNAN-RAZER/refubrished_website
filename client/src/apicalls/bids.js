// Place a new build

import { axiosInstance } from "./axiosInstance";

export const placeNewBid = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:5001/vl/api/bids/place-new-bid",
      payload
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all bids
export const getAllBids = async (filters) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:5001/vl/api/bids/get-all-bids",
      filters
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};
