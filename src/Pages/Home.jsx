import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "../Components/Post";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../Redux/Notifications";
import { SendNotification } from "../Redux/Notifications";
import Loading from "../Components/Loading"

const Home = ({ BackendUrl }) => {
  const { UserData } = useSelector((state) => state.Users);
  const [MyHobbyPost, setMyHobbyPost] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Loader, setLoader] = useState(false);

  const getPosts = async () => {
    setLoader(true);
    try {
      const Hobby = UserData.data.hobby;
      const getHobbyPost = await axios.post(
        `${BackendUrl}/post/getAllpostByhobby`,
        {
          hobby: Hobby,
        },
        {
          withCredentials: true,
        }
      );
      setLoader(false);
      setMyHobbyPost(getHobbyPost.data.data);
    } catch (error) {
      setLoader(false);
      setMyHobbyPost({ success: false });
      dispatch(
        setNotification({
          message: "Failed to retrieve posts",
          type: "error",
        })
      );
      dispatch(SendNotification());
      setMyHobbyPost([]);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <Content>
          {Loader ? (
            <Loading />
          ) : (
            <>
              <Posts>
                {MyHobbyPost.length !== 0 ? (
                  MyHobbyPost.map((post) => (
                    <Post
                      Postkey={post._id}
                      title={post.title}
                      des={post.desc}
                      date={post.date}
                      like={post.likes}
                      comments={post.comments}
                      imageUrl={post.imageURL}
                      name={post.name}
                      email={post.name}
                      BackendUrl={BackendUrl}
                      getPosts={getPosts}
                    />
                  ))
                ) : (
                  <h1>No Posts Available</h1>
                )}
              </Posts>
            </>
          )}
        </Content>
      </Container>
    </motion.div>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
`;

const Content = styled.div`
  width: 61%;
  display: flex;
  justify-content: center;
`;

const Posts = styled.div`

  @media (max-width: 760px) {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-direction: column;
  }
`;
