import React, { useState } from "react";
import RegisterModel from "../Components/RegisterModel";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthStatusAndData } from "../Redux/Users.";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom";
import { SendNotification, setNotification } from "../Redux/Notifications";

const Login = ({ BackendUrl }) => {
  const [ApiData, setApiData] = useState("");
  const [Loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const FetchLoginApi = async (email, password) => {
    try {
      setLoader(true);
      const User = await axios.post(
        `${BackendUrl}/auth/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      setLoader(false);
      setApiData(User.data);
      dispatch(
        setNotification({
          message: User.data.message,
          success: "true",
        })
      );
      dispatch(
        setAuthStatusAndData({
          IsAuth: true,
          data: ApiData,
        })
      );
      dispatch(SendNotification());
      localStorage.setItem("user_loginToken", User.data.data._id);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoader(false);
      dispatch(
        setNotification({
          message: error.response.data.message,
          success: "false",
        })
      );
      dispatch(SendNotification());
      navigate("/login");
    }
  };

  return (
    <div>
      {Loader ? (
        <Loading />
      ) : (
        <RegisterModel Mode="Login" FetchLoginApi={FetchLoginApi} />
      )}
    </div>
  );
};

export default Login;
