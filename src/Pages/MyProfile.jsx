import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../Redux/Notifications";
import { SendNotification } from "../Redux/Notifications";

const MyProfile = ({ BackendUrl }) => {
  const { UserData } = useSelector((state) => state.Users);
  const [Posts, setPosts] = useState([]);
  const [closeAnimation, setCloseAnimation] = useState(false);
  const [PostsId, setPostsId] = useState("");
  const [Password, setPassword] = useState("");
  const [ShowOption, setShowOption] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserPosts = async () => {
    const UserId = UserData.data._id;
    console.log(UserId);
    const userPosts = await axios.post(
      `${BackendUrl}/post/getAllpostByUserId`,
      {
        userId: UserId,
      },
      {
        withCredentials: true,
      }
    );
    setPosts(userPosts.data.data);
  };

  const handlesetShowOption = (postId) => {
    setShowOption(!ShowOption);
    setPostsId(postId);
  };

  const Postdelete = async (PostId, password) => {
    try {
      const PostDel = await axios.post(
        `${BackendUrl}/post/delete`,
        {
          postId: PostId,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      setShowOption(false);
      fetchUserPosts();
      dispatch(
        setNotification({
          message: "Deleted the post SuccessFully",
          success: "true",
        })
      );
      dispatch(SendNotification());
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);
  useEffect(() => {
    setCloseAnimation(false);
  }, [ShowOption]);


  return (
    <div>
      {ShowOption ? (
        <>
          <motion.div
            initial={{ top: 0 }}
            animate={{
              top: closeAnimation ? "100%" : "30%",
              transition: { duration: 0.5 },
            }}
            onEnded={() => setCloseAnimation(true)}
            style={{
              width: "40%;",
              position: "fixed",
              backgroundColor: "white",
              top: "50%",
              borderRadius: "12px",
              padding: "12px",
              left: "40%",
              zIndex: "9999999999999999999999",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
              }}
            >
              <input
                required
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                style={{
                  background: "#FFFF",
                  color: "black",
                  borde: "1px solid black !important",
                  borderRadius: "8px",
                  padding: "12px",
                  margin: "12px",
                  outline: "none",
                }}
                placeholder="Enter your password"
              />
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  width: "40%",
                  padding: "12px",
                  backgroundColor: "blue",
                  color: "#FFF",
                  textAlign: "center",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => Postdelete(PostsId, Password)}
              >
                Delete
              </p>
              <p
                style={{
                  width: "40%",
                  padding: "12px",
                  backgroundColor: "red",
                  color: "#FFF",
                  textAlign: "center",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => setShowOption(!ShowOption)}
              >
                Cancel
              </p>
            </div>
          </motion.div>
        </>
      ) : (
        ""
      )}
      <Container>
        <Content>
          <ProfileTop>
            <Avatar style={{ width: "35%", height: "18%" }} />
            <UserDetail>
              <h2>{UserData.data.name}</h2>
              <p>{UserData.data.bio}</p>
              <h4>
                Hobby -<span>{UserData.data.hobby}</span>
              </h4>
              <div>
                <motion.button whileHover={{ scale: 1.01, cursor: "pointer" }}>
                  Friends : {UserData.data.followers}
                </motion.button>
                <motion.button whileHover={{ scale: 1.01, cursor: "pointer" }}>
                  Super Friends : {UserData.data.following}
                </motion.button>
              </div>
            </UserDetail>
          </ProfileTop>
          <ProfileBottom>
            <ProfileBottomTop>
              <h4>Posts</h4>
              <Link
                style={{ color: "#fff", textDecoration: "none" }}
                to="/saved"
              >
                <h4>Saved Posts</h4>
              </Link>
            </ProfileBottomTop>
            <ProfilePosts>
              <PostMiddle>
                {Posts.length !== 0 ? (
                  Posts.map((i) => (
                    <motion.div
                      initial={{ position: "relative", left: "-200px " }}
                      animate={{
                        left: "0px",
                        zIndex: "9999999",
                      }}
                      exit={{ left: "30px" }}
                    >
                      <DeleteIcon
                        onClick={() => handlesetShowOption(i._id)}
                        style={{
                          color: "black",
                          position: "absolute",
                          right: "12px",
                          top: "22px",
                          zIndex:
                            "9999999999999999999999999999999999999999999999999999999999999999",
                          backgroundColor: "#FFF",
                          borderRadius: "12px",
                        }}
                      />

                      <motion.img
                      style={{maxHeight:"400px" ,minHeight:"400px"}}
                        whileHover={{ scale: 1.01, cursor: "pointer" }}
                        src={i.imageURL}
                        onClick={() => navigate(`soper/post/${i._id}`)}
                      />
                    </motion.div>
                  ))
                ) : (
                  <h1>Create a Post</h1>
                )}
              </PostMiddle>
            </ProfilePosts>
          </ProfileBottom>
        </Content>
      </Container>
    </div>
  );
};

export default MyProfile;

const Container = styled.div`
  width: 100%;
  @media (max-width:760px) {
    width:98vw;
    margin: 20% 0;
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
  @media (max-width: 760px) {
    flex-direction: column;
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
    width: 95%;
    height: 100%;
    min-height: 300px;
    margin: 12px 5px;
    object-fit: contain;
  }
`;
