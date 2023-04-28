import React from "react";
import styled from "styled-components";
import AdImage from "../assets/Ad.png";

const Ad = () => {
  return (
    <>
      <Container>
        <h1>Sopo Ads</h1>
        <AdDesc>
          <p>
            At our ad agency, we know how to make your brand stand out on social
            media. Our team of experts has the experience and creativity to
            craft custom campaigns that connect with your audience and drive
            real results. We offer a range of services, from social media
            management and content creation to influencer marketing and paid
            advertising. We understand the importance of staying up-to-date with
            the latest trends and best practices in social media marketing.
            That's why we stay on top of the latest algorithms and updates to
            ensure that our clients' campaigns are always performing at their
            best. With our services, you can focus on what you do best – running
            your business – while we handle the rest. We take care of the
            strategy, execution, and optimization of your social media campaigns
            so that you can see real growth and engagement. Trust us to help you
            take your social media presence to the next level on Sopo.
          </p>
        </AdDesc>
        <div>
          <h5>Start advertisement with us</h5>
        </div>
        <h6>Instagram -@prakhar_deshmukhh</h6>
        
      </Container>
    </>
  );
};

export default Ad;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding:8px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const AdDesc=styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  & p {
    max-width:100%;
    font-size: 10px;
    text-align: center;
  }
`
