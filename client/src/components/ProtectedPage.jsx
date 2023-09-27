import { Avatar, Badge, message } from "antd";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loadersSlice";
import { setUser } from "../redux/userSlice";
import Notifications from "./Notifications";
import { DeleteNotification, GetAllNotifications, ReadAllNotifications } from "../apicalls/notification";


const ProtectedPage = ({ children }) => {
  const [notifications = [], setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch();
  const validateToken = async () => {
    try {
      dispatch(setLoader(true));

      const response = await getCurrentUser();
      if (response.success) {
        message.success(response.message);
        dispatch(setUser(response.data));
        dispatch(setLoader(false));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error);
      navigate("/login");
      dispatch(setUser(null));
      dispatch(setLoader(false));
    }
  };

  const getNotifications = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllNotifications();
      dispatch(setLoader(false));
      if (response.success) {

        setNotifications(response.data);
      }
      else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error);

    }
  }

  const readNotifications = async () => {
    try {
      dispatch(setLoader(true));
      const response = await ReadAllNotifications();
      dispatch(setLoader(false));
      if (response.success) {
        getNotifications();
      }
      else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error);

    }
  }

  const deleteNotification = async (notificationId) => {
    try {
      dispatch(setLoader(true));
      const response = await DeleteNotification(notificationId);
      dispatch(setLoader(false));
      if (response.success) {
        getNotifications();
      }
      else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error);

    }
  }


  const logout = () => {
    localStorage.removeItem('token');

    navigate('/login');
  }
  useEffect(() => {
    // if (!user) {
    //   navigate("/login");
    // } else {

    // if (localStorage.getItem('token')) {
    validateToken();
    getNotifications();
    // }
    // else {

    //   navigate('/login');
    // }

    //}
  }, []);

  return (
    <div>
      {user && (
        <div>
          {/* Header */}
          <div className="flex justify-between items-center bg-primary p-5 ">
            <h1 className="text-2xl  text-white cursor-pointer"
              onClick={() => navigate('/')}
            >MP</h1>
            <div className=" flex fap-1  items-center bg-white py-3 px-5 rounded">
              <span
                onClick={() => {
                  if (user.role === 'user') {
                    navigate('/profile')
                  }
                  else {
                    navigate('/admin')
                  }
                }}
                className="underline cursor-pointer uppercase">
                {user.username}

              </span> &nbsp;
              {
                <Badge

                  count={notifications.length > 0 ? notifications.filter((notification) => !notification.seen).length : 0}
                  size="small"
                  className="cursor-pointer"
                  showZero={true}
                  onClick={() => {
                    readNotifications()
                    setShowNotifications(true)
                  }}
                >
                  <Avatar shape="circle" size="small"

                    icon={<i
                      className="ri-notification-3-line"
                    ></i>}
                  />
                </Badge>}
              <i className="ri-logout-circle-r-line ml-10 cursor-pointer"
                onClick={() => logout()}
              ></i>
            </div>
          </div>
          {/* Body */}
          <div className="p-5">

            {children}

          </div>

          {
            showNotifications && (
              <Notifications
                notifications={notifications}
                reloadNotifications={setNotifications}
                showNotifications={showNotifications}
                setShowNotifications={setShowNotifications}
                deleteNotification={deleteNotification}
              />
            )
          }
        </div>
      )}
    </div>
  );
};










export default ProtectedPage;