const notificationRouter = require("express").Router();

const {
  addNotification,
  getAllNotification,
  deleteNotification,
  readAllNotifications,
} = require("../controllers/Notification_Controller/notificationController");

const authMiddleware = require("../middleware/authMiddleware");

// To add a new Notification
notificationRouter.post("/add-notification", authMiddleware, addNotification);

// Get all notifications related to an user
notificationRouter.get(
  "/get-all-user-notification",
  authMiddleware,
  getAllNotification
);

// Get all notifications related to an user
notificationRouter.delete(
  "/delete-a-notification/:id",
  authMiddleware,
  deleteNotification
);
notificationRouter.put(
  "/read-all-notifications",
  authMiddleware,
  readAllNotifications
);

module.exports = notificationRouter;
