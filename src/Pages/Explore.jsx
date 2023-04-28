import React, { useEffect, useState } from "react";
import Post from "../Components/Post";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "../Components/Loading";

const Explore = ({ BackendUrl }) => {
  const [UserPost, setUserPost] = useState([]);
  const [UserInfo, setUserInfo] = useState([]);
  const [Loader, setLoader] = useState(false);

  const { UserData } = useSelector((state) => state.Users);
  const FetchPosts = async () => {
    setLoader(true)
    try {
      const data = await axios.get(`${BackendUrl}/post/getAllpost`);
      setLoader(false)
      setUserPost(data.data.data);
      
    } catch (error) {
      setLoader(false)
      console.error(error.mesage);
    }
  };

  useEffect(() => {
    FetchPosts();
  }, []);
  return (
    <Content>
      {Loader ? (
        <Loading />
      ) : (
        <>
          {UserPost.length !== 0 ? (
            UserPost.map((post) => (
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
                getPosts={FetchPosts}
                Type={false}
              />
            ))
          ) : (
            <h1>No Posts Available</h1>
          )}
        </>
      )}
    </Content>
  );
};

export default Explore;

const Content = styled.div`
  width: 60%;
  height: 100%;
`;
