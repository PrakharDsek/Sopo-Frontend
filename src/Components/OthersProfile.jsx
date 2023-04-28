import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useSelector } from "react-redux";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useDispatch } from "react-redux";
import { SendNotification, setNotification } from "../Redux/Notifications";

const Profile = ({ BackendUrl }) => {
  const { UserId } = useParams();
  const [User, setUser] = useState([]);
  const [found, setFound] = useState("");
  const [post, setPosts] = useState([]);
  const [Id, setUserId] = useState("");
  const [Loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { UserData } = useSelector((state) => state.Users);

  const findUser = async () => {
    try {
      const users = await axios.post(`${BackendUrl}/user/find`, {
        name: UserId,
      });

      const Posts = await axios.post(`${BackendUrl}/post/getAllpostByUserId`, {
        userId: users.data.data._id,
      });
      setPosts(Posts.data.data);
      setUserId(users.data.data._id);
      setUser(users.data);
      setFound("found");
    } catch (error) {
      console.error(error.message);
      setFound("not found");
    }
  };
  const findUserPosts = async () => {
    try {
      const Posts = await axios.post(`${BackendUrl}/post/getAllpostByUserId`, {
        userId: Id,
      });
      setPosts(Posts);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    findUser();
  }, []);
  useEffect(() => {
    findUserPosts();
  }, []);

  const handleAddFriend = async () => {
    try {
      const Addfriend = await axios.post(
        `${BackendUrl}/friends/new`,
        {
          friendName: User.data.name,
          friendId: User.data._id,
          userId: UserData.data._id,
        },
        {
          withCredentials: true,
        }
      );
      setLoader(false);
      dispatch(
        setNotification({
          message: `Added ${User.data.name} as friend `,
          success: "true",
        })
      );
      dispatch(SendNotification());
    } catch (error) {
      setLoader(false);
      dispatch(
        setNotification({
          message: "Both are already friends",
          success: "false",
        })
      );
      dispatch(SendNotification());
    }
  };

  return (
    <Container>
      <Content>
        <ProfileTop>
          <Avatar style={{ width: "35%", height: "18%" }} />
          <UserDetail>
            <div>
              <h2>{UserId}</h2>
              <motion.p
                whileHover={{ scale: "1.2", cursor: "pointer" }}
                style={{ margin: 0, padding: 0 }}
                onClick={handleAddFriend}
              >
                <PersonAddIcon style={{ marginLeft: "12px" }} />
              </motion.p>
            </div>
            <p>{User.length !== 0 ? User.data.bio : ""}</p>
            <h4>{User.length !== 0 ? User.data.hobby : ""}</h4>
            <div>
              <motion.button whileHover={{ scale: 1.01, cursor: "pointer" }}>
                Friends : {User.length !== 0 ? User.data.following : ""}
              </motion.button>
              <motion.button whileHover={{ scale: 1.01, cursor: "pointer" }}>
                Super Friends : {User.length !== 0 ? User.data.following : ""}
              </motion.button>
            </div>
          </UserDetail>
        </ProfileTop>
        <ProfileBottom>
          <ProfileBottomTop>
            <h4>Posts</h4>
          </ProfileBottomTop>
          <ProfilePosts>
            <PostMiddle>
              {post.length !== 0 ? (
                post.map((i) => (
                  <motion.img
                    key={i._id}
                    onClick={() => navigate(`/others/soper/post/${i._id}`)}
                    whileHover={{ scale: 1.01, cursor: "pointer" }}
                    src={i.imageURL}
                  />
                ))
              ) : (
                <h1>Create a Post</h1>
              )}
            </PostMiddle>
          </ProfilePosts>
        </ProfileBottom>
      </Content>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  width: 100%;
  @media (max-width:760px) {
    width:100vw;
    margin:20% 0;
  }
`;

const Content = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  @media (max-width:760px) {
    width:100%;
  }
`;

const ProfileTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  margin: 22px 0 22px 0;
`;

const UserDetail = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap");
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 8px;
  line-height: 22px;
  & h2 {
    margin: 0;
  }
  h4 {
    margin: 0;
    span {
      font-family: "Poppins", sans-serif;
      font-weight: 400;
      font-size: 12px;
    }
  }
  & button {
    width: 60%;
    padding: 8px;
    background-color: #613385;
    border: 1px solid lightgray;
    outline: none;
    margin: 22px 0;
  }
  & div {
    display: flex;
    width: 100%;
  }
`;
const ProfileBottom = styled.div`
  width: 100%;
  height: 100%;
`;

const ProfileBottomTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid lightgray;
  & h4 {
    margin: 18px;
    :hover {
      cursor: pointer;
    }
  }
`;

const ProfilePosts = styled.div`
  width: 100%;
  height: 100%;
`;

const PostMiddle = styled.div`
  margin: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 8px;
  & div {
    display: flex;
    width: 50%;
  }
  & img {
    border: 1px solid lightgray;
    border-radius: 8px;
    width: 90%;
    height: 100%;
    margin-top: 12px;
    object-fit: contain;
  }
`;
