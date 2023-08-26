import { message } from "antd";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("token"));

  const validateToken = async () => {
    try {
      const response = await getCurrentUser();
      if (response.success) {
        message.success(response.message);
        setUser(response.data);
        console.log(response);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      validateToken();
    }
  }, []);

  return (
    <div>
      {user && (
        <div>
          {/* Header */}
          <div className="flex justify-between items-center bg-primary p-5 ">
            <h1 className="text-2xl  text-white">MP</h1>
            <div className=" flex fap-1  items-center bg-white py-2 px-5 rounded">
            <i class="ri-shield-user-line mr-5 "></i>
              <span className="underline cursor-pointer uppercase">
                {user.username}
              
              </span>
              <i class="ri-logout-circle-r-line ml-10 cursor-pointer"></i>
            </div>
          </div>
          {/* Body */}
          <div className="p-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default ProtectedPage;
