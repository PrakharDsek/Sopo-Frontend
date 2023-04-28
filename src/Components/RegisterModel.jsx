import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const RegisterModel = ({ Mode ,FetchLoginApi}) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  
  const handleReg = () => {
    if (Mode == "Login") {
      FetchLoginApi(Email ,Password)
    } else {
      
   
    }
  };
  return (
    <Container>
      <Content>
        <Header>
          <h1>{Mode}</h1>
        </Header>
        <LoginBody>
          {Mode == "Login" ? (
            <>
              <div>
                <div>
                  <h5>E-mail</h5>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={Email}
                    type="email"
                    placeholder="E-mail here"
                  />
                </div>
                <div>
                  <h5>Password</h5>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={Password}
                    type="password"
                    placeholder="Password here"
                  />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          <motion.button
            onClick={handleReg}
            whileHover={{ scale: 1.1, cursor: "pointer" }}
          >
            {Mode}
          </motion.button>
        </LoginBody>
      </Content>
    </Container>
  );
};

export default RegisterModel;

const Container = styled.div`
  width: 60%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  border: 1px solid lightgray;
  border-radius: 4px;
  width: 50%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  width: 100%;
`;

const LoginBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  & input {
    width: 100%;
    padding: 8px;
    outline: none;
    border: none;
    border-bottom: 1px solid lightgray;
    background-color: transparent;
  }
  & div {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  & button {
    width: 80%;
    outline: none;
    border: 1px solid lightgray;
    border-radius: 8px;
    margin-top: 20%;
    padding: 8px;
    background-color: #4a4af1;
    align-self: center;
  }
`;
