import React, { useEffect, useState } from "react";
import Post from "../Components/Post";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";

const SavedPosts = ({ BackendUrl }) => {
  const { UserData } = useSelector((state) => state.Users);
  const [MySavedpost, setMySavedPosts] = useState([]);

  const UserId = UserData.data._id;
  const getSavedPosts = async () => {
    try {
      const savedPosts = await axios.post(
        `${BackendUrl}/post/Getsaved`,
        {
          UserId: UserId,
        },
        {
          withCredentials: true,
        }
      );
      setMySavedPosts(savedPosts.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getSavedPosts();
  }, []);

  return (
    <Container>
      <Content>
        <SavedPost>
          <Pagetitle>
            <h1>Saved Posts</h1>
          </Pagetitle>
          {MySavedpost.length !== 0 ? (
            MySavedpost.map((post) => (
              <>
                <Post
                  Postkey={post.Post._id}
                  SavedPostId={post._id}
                  title={post.Post.title}
                  des={post.Post.desc}
                  date={post.Post.date}
                  like={post.Post.likes}
                  comments={post.Post.comments}
                  imageUrl={post.Post.imageURL}
                  name={post.Post.name}
                  email={post.Post.name}
                  BackendUrl={BackendUrl}
                  getPosts={getSavedPosts}
                  Type={true}
                />
              </>
            ))
          ) : (
            <h2>No saved posts</h2>
          )}
        </SavedPost>
      </Content>
    </Container>
  );
};

export default SavedPosts;

const Container = styled.div`
  width: 60%;
  height: 100%;
  @media (max-width:760px) {
    width:100vw;
    margin:20% 0;
  }
`;

const Content = styled.div`
  height: 100%;
`;

const SavedPost = styled.div`
  height: 100%;
`;

const Pagetitle = styled.div`
  text-align: center;
`;
