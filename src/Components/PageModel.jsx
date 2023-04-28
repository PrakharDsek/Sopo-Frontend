import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Ad from "../Pages/ad";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuthStatusAndData } from "../Redux/Users.";
import { setNotification } from "../Redux/Notifications";

const PageModel = ({ Main, BackendUrl }) => {
  const [auth, setAuth] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const IsAuth = async () => {
    if (localStorage.getItem("loginToken")) {

      const UserId = localStorage.getItem("loginToken");
      const getUser = await axios.post(
        `${BackendUrl}/user/find`,
        { userId: UserId },
        { WithCreditential: true }
      );
      dispatch(
        setAuthStatusAndData({
          IsAuth: true,
          data: getUser.data,
        })
      );
      setAuth(true);

    } else {

      setAuth(false);
      navigate("/register");
      dispatch(
        setNotification({
          success: false,
          message: "Login First",
        })
      );

    }
  };

  useEffect(() => {
    IsAuth();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {auth ? (
        <Container>
          <Content>
            <Body>
              <BodyLeft>
                <Header />
              </BodyLeft>
              <BodyMiddle>{Main}</BodyMiddle>
              <BodyRight>
                <Ad />
              </BodyRight>
            </Body>
          </Content>
        </Container>
      ) : (
        navigate("/register")
      )}
    </motion.div>
  );
};

export default PageModel;

const Container = styled.div`
  color: #fff;
  width: 100vw;
  background-color: #0a092b;
  overflow-x: hidden;
`;

const Content = styled.div`
  width: 99%;
  height: 100%;
  overflow: hidden;
`;

const Body = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

const BodyLeft = styled.div`
  flex: 4;
  width: 100%;
  height: 100%;
  z-index:9999999999999999999999999999999;
  overflow-y: hidden;
  overflow-x: hidden;
`;

const BodyMiddle = styled.div`
  flex: 13;
  width: 100%;
  height: 100%;
  @media (max-width:760px) {
    margin: 20% 0;
  }

`;

const BodyRight = styled.div`
  flex: 4;
  width: 30%;
  height: 100%;
  background-color: #0a092b;
  border-left: 4px solid lightgray;
  position: fixed;
  right: 0;
  z-index:9999999999999999999999999999999999999;
  @media (max-width: 760px) {
    display: none;
  }
`;
