import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthStatusAndData } from "../Redux/Users.";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom";
import { SendNotification, setNotification } from "../Redux/Notifications";
import { Create } from "@mui/icons-material";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  color: #fff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 20px;
  background-color: transparent;
  border-radius: 10px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid lightgray;
  border-radius: 5px;
  background-color: transparent;
  font-size: 16px;
  color: #fff;
  margin: 15px;
  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #5c5c5c;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #424242;
  }
`;

const ToggleFormButton = styled.button`
  margin-top: 20px;
  border: none;
  background-color: transparent;
  color: #fff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Register = ({ BackendUrl }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [bio, setBio] = useState("");
  const [Hobby, setHobby] = useState("");
  const [Age, setAge] = useState("");
  const [FullName, setFullName] = useState("");
  const [AccountType, setAccountType] = useState("");
  const [Loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const FetchLoginApi = async () => {
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
      dispatch(
        setNotification({
          message: User.data.message,
          success: "true",
        })
      );
      dispatch(
        setAuthStatusAndData({
          IsAuth: true,
          data: Create,
        })
      );
      dispatch(SendNotification());
      localStorage.setItem("loginToken", User.data.data._id);
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
      navigate("/register");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const Create = await axios.post(
        `${BackendUrl}/auth/createUser`,
        {
          email: email,
          password: password,
          bio: bio,
          age: Age,
          fullname: FullName,
          hobby: Hobby,
          accountType: AccountType,
          name: FullName,
        },
        {
          withCredentials: true,
        }
      );
      setLoader(false);
      dispatch(
        setAuthStatusAndData({
          IsAuth: true,
          data: Create.data,
        })
      );
      dispatch(
        setNotification({
          message: Create.data.message,
          success: "true",
        })
      );
      dispatch(
        setAuthStatusAndData({
          IsAuth: true,
          data: Create,
        })
      );
      dispatch(SendNotification());
      console.log(Create);
      localStorage.setItem("loginToken", Create.data.data._id);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setLoader(false);
      dispatch(
        setNotification({
          message: error.message,
          success: "false",
        })
      );
      dispatch(SendNotification());
      navigate("/register");
    }
  };

  return (
    <LoginContainer>
      {Loader ? (
        <Loading />
      ) : (
        <>
          {isLoginForm ? (
            <Form onSubmit={handleSubmit}>
              <h2>Login</h2>
              <InputField
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <SubmitButton onClick={FetchLoginApi} type="submit">
                Submit
              </SubmitButton>
              <ToggleFormButton onClick={toggleForm}>
                Create Account
              </ToggleFormButton>
            </Form>
          ) : (
            <Form>
              <h2>Create Account</h2>
              <InputField
                onChange={(e) => setFullName(e.target.value)}
                value={FullName}
                type="text"
                placeholder="What is your Full Name"
              />
              <InputField
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="What is your Email"
              />
              <InputField
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="You Password for account"
              />
              <InputField
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                type="text"
                placeholder="Your Bio ?"
              />
              <InputField
                onChange={(e) => setHobby(e.target.value)}
                value={Hobby}
                type="text"
                placeholder="What is your hobby ?"
              />
              <InputField
                onChange={(e) => setAge(e.target.value)}
                value={Age}
                max={"110"}
                min={9}
                type="number"
                placeholder="What is your age"
              />

              <SubmitButton onClick={handleSubmit} type="submit">
                Create Account
              </SubmitButton>
              <ToggleFormButton onClick={toggleForm}>Login</ToggleFormButton>
            </Form>
          )}
        </>
      )}
    </LoginContainer>
  );
};

export default Register;
