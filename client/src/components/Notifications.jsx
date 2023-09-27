import { Modal } from "antd";
import React from "react";
import Divider from "./Divider";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
const Notifications = ({
  notifications = [],
  reloadNotifications,
  showNotifications,
  setShowNotifications,
  deleteNotification
}) => {

  const navigate = useNavigate();

  return (
    <Modal
      title="Notifications"
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={1000}
    >
      <div className="flex flex-col gap-2">
        {
          notifications.map(notification => {
            return (
              <div className="flex flex-col justify-between items-center border border-solid cursor-pointer"
                key={notification._id}
                onClick={
                  () => {

                    navigate("/profile")
                    setShowNotifications(false)
                  }

                }
              >

                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-gray-700">
                      {notification.title.trim()}
                    </h1>
                    <Divider />
                    <span
                      className="text-gray-500"
                    >{notification.message}
                    </span>
                    <h1 className="text-gray-500">
                      {moment(notification.cratedAt).fromNow()}
                    </h1>

                  </div>
                  <i className="ri-delete-bin-line cursor-pointer ml-10 text-xl"
                    onClick={() => { deleteNotification(notification._id) }}
                  ></i>
                </div>

              </div>
            )
          })
        }
      </div>
    </Modal>
  );
};

export default Notifications;
