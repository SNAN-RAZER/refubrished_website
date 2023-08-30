import { message } from "antd";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loadersSlice";
import { setUser } from "../redux/userSlice";

const ProtectedPage = ({ children }) => {
  const navigate = useNavigate();
 const {user} = useSelector(state => state.user)
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
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    // if (!user) {
    //   navigate("/login");
    // } else {
      validateToken();
    //}
  }, []);

  return (
    <div>
      {user && (
        <div>
          {/* Header */}
          <div className="flex justify-between items-center bg-primary p-5 ">
            <h1 className="text-2xl  text-white">MP</h1>
            <div className=" flex fap-1  items-center bg-white py-2 px-5 rounded">
            <i className="ri-shield-user-line mr-5 "></i>
              <span className="underline cursor-pointer uppercase">
                {user.username}
              
              </span>
              <i className="ri-logout-circle-r-line ml-10 cursor-pointer"></i>
            </div>
          </div>
          {/* Body */}
          <div className="p-5">
          
          {children}
           
            </div>
        </div>
      )}
    </div>
  );
};

export default ProtectedPage;
