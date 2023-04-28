import React from "react";
import Rolling from "../assets/Rolling.gif";
import styled from "styled-components";

const Loading = () => {
  return (
    <Content>
      <Loader>
        <img src={Rolling} />
      </Loader>
    </Content>
  );
};

export default Loading;

const Content = styled.div`
  width: 10vw;
  height: 100vh;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-widt: 760px) {
    width: 100vw;
  }
`;

const Loader = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;
  & img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;
