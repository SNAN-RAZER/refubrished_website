import { axiosInstance } from "./axiosInstance";

// add a notification
export const AddNotification = async (data) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:5001/vl/api/notifications/add-notification",
      data
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Add a notification
export const GetAllNotifications = async (data) => {
  try {
    const response = await axiosInstance.get(
      "http://localhost:5001/vl/api/notifications/get-all-user-notification"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
// Read all notifications
export const ReadAllNotifications = async (data) => {
  try {
    const response = await axiosInstance.put(
      "http://localhost:5001/vl/api/notifications/read-all-notifications"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Delete a notification
export const DeleteNotification = async (notificationId) => {
  try {
    const response = await axiosInstance.delete(
      `http://localhost:5001/vl/api/notifications//delete-a-notification/${notificationId}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
