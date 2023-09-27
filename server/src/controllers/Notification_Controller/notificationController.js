const notificationModel = require("../../models/notificationModel");

// ADD  a notification
const addNotification = async (req, res) => {
  try {
    const newNotification = new notificationModel(req.body);
    await newNotification.save();
    return res.status(201).send({
      success: true,
      message: "Notification created successfully",
    });
  } catch (error) {
    return res.status(200).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

// Get all notifications related to an user
const getAllNotification = async (req, res) => {
  try {
    const notification = await notificationModel
      .find({
        user: req.body.userId,
      })
      .sort({ created: -1 });
    console.log(notification);
    return res.status(200).send({
      success: true,
      message: "Fetched all the notifications successfully",
      data: notification,
    });
  } catch (error) {
    return res.status(200).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    await notificationModel.findByIdAndDelete(req.params.id);
    return res.status(201).send({
      success: true,
      message: "Deleted a notification",
    });
  } catch (error) {
    return res.status(200).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

// Read all notifications
const readAllNotifications = async (req, res) => {
  try {
    await notificationModel.updateMany(
      { user: req.body.userId, seen: false },
      { $set: { seen: true } }
    );
    return res.status(201).send({
      success: true,
      message: "Read all notifications",
    });
  } catch (error) {
    return res.status(200).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

module.exports = {
  addNotification,
  getAllNotification,
  deleteNotification,
  readAllNotifications,
};
