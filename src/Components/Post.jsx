import { Avatar } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { motion } from "framer-motion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import LikedImage from "../assets/likes.gif";
import likesPng from "../assets/likes.png";
import { useDispatch, useSelector } from "react-redux";
import { SendNotification, setNotification } from "../Redux/Notifications";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";

const Post = ({
  Postkey,
  getPosts,
  BackendUrl,
  title,
  des,
  date,
  like,
  comments,
  imageUrl,
  name,
  email,
  Type,
 SavedPostId,
}) => {
  const [showHidden, setSHowHidden] = useState(false);
  const [likedPost, setLikedPost] = useState(false);
  const [Disablelike, setLikeDisable] = useState(false);
  const [Loader, setLoader] = useState(false);
  const dispatch = useDispatch()
  const [UserComment, setUserComment] = useState("");

  const navigate = useNavigate();
  const { UserData } = useSelector((state) => state.Users);

  const changeHiddenState = () => {
    setSHowHidden(!showHidden);
  };

  const SavePost = async () => {
    const save = await axios.post(
      `${BackendUrl}/post/save`,
      {
        PostId: Postkey,
        UserId: UserData.data._id,
      },
      {
        withCredentials: true,
      }
    );
    setLoader(false);
    dispatch(
      setNotification({
        message: "Saved the post",
        success: "true",
      })
    );
    dispatch(SendNotification());
  };

  const removeSavedPost = async () => {
    setLoader(true);
    try {
      const saved = axios.post(
        `${BackendUrl}/post/RemoveSaved`,
        {
          SavedPostId: SavedPostId,
          userId: UserData.data._id,
        },
        {
          withCredentials: true,
        }
      );

      setLoader(false);
      dispatch(
        setNotification({
          message: "removed the saved post",
          success: "true",
        })
      );
      dispatch(SendNotification());
      getPosts();
    } catch (error) {
      setLoader(false);
      dispatch(
        setNotification({
          message: "AN error occured",
          success: "false",
        })
      );
      dispatch(SendNotification());
    }
  };
  const unLikePost = async () => {
    const like = await axios.post(`${BackendUrl}/post/like`, {
      postId: Postkey,
      like: -1,
    });
    setLikeDisable(false);
    setLikedPost(false);
    getPosts();
    setTimeout(() => {
      setLikedPost(false);
    }, 2550);
  };

  const likePost = async () => {
    const like = await axios.post(`${BackendUrl}/post/like`, {
      postId: Postkey,
      like: 1,
    });
    setLikeDisable(true);
    setLikedPost(true);
    getPosts();
    setTimeout(() => {
      setLikedPost(false);
    }, 2550);
  };

  const handleLikeOnImage = () => {
    if (likedPost) {
      unLikePost();
    } else {
      likePost();
    }
  };

  
  const AddComment = async () => {
    setLoader(true);
    const newComment = await axios.post(
      `${BackendUrl}/comments/new`,
      {
        CommenterUserId: UserData.data._id,
        PostId: Postkey,
        comment: UserComment,
        name: UserData.data.name,
      },
      {
        withCredentials: true,
      }
    );
    setLoader(false);
    dispatch(
      setNotification({
        message: "Added comment",
        success: "true",
      })
    );
    dispatch(SendNotification());
    setUserComment("");
  };

  return (
    <motion.div
      initial={{ position: "relative", left: 0 }}
      animate={{ left: "50px" }}
      exit={{ left: "30px" }}
    >
      <Container>
        <Content>
          <PostTop>
            <p onClick={() => navigate(`/soper/${name}`)}>
              <Avatar src={imageUrl} />
              <h5>{!name ? "Anonymous" : name}</h5>
            </p>
            <motion.p
              whileHover={{ scale: 1.1, cursor: "pointer" }}
              onClick={changeHiddenState}
            >
              <MoreVertIcon />
            </motion.p>
            {showHidden ? (
              <PostTopHidden
                style={{ border: "1px solid lightgray", borderRadius: "12px" }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CloseIcon onClick={changeHiddenState} />
                  <motion.p
                    onClick={() => window.open(imageUrl, "_blank")}
                    whileHover={{ cursor: "pointer" }}
                    style={{ width: "100%" }}
                  >
                    Download
                  </motion.p>
                </motion.div>
              </PostTopHidden>
            ) : (
              ""
            )}
          </PostTop>

          <PostMiddle style={{ position: "relative" }}>
            {likedPost ? (
              <img
                style={{
                  position: "absolute",
                  width: "25%",
                  height: "29%",
                  top: "32%",
                  left: "37%",
                }}
                src={LikedImage}
              />
            ) : (
              ""
            )}
            <motion.img src={imageUrl} onDoubleClick={handleLikeOnImage} />
          </PostMiddle>
          <PostBottom>
            <Icons>
              <motion.p
                style={{
                  cursor: "auto",
                  transform: "none",
                  width: " 7%",
                }}
                whileHover={{ scale: 1.1, cursor: "pointer" }}
              >
                {Disablelike ? (
                  <img
                    src={likesPng}
                    onClick={handleLikeOnImage}
                    style={{ width: "100%" }}
                  />
                ) : (
                  <FavoriteBorderIcon onClick={handleLikeOnImage} />
                )}
              </motion.p>
              <motion.p whileHover={{ scale: 1.1, cursor: "pointer" }}>
                <CommentIcon
                  onClick={() => navigate(`soper/post/${Postkey}`)}
                />
              </motion.p>
              {!Type ? (
                <motion.p whileHover={{ scale: 1.1, cursor: "pointer" }}>
                  <TurnedInNotIcon onClick={() => SavePost()} />
                </motion.p>
              ) : (
                <motion.p whileHover={{ scale: 1.1, cursor: "pointer" }}>
                  <BookmarkRemoveIcon onClick={removeSavedPost} />
                </motion.p>
              )}
            </Icons>
            <p>
              <span>{like} likes</span>
            </p>
            <p>{des}</p>
            <p className="Post__font-light">
              <span>
                <Link to={`soper/post/${Postkey}#comment`}>
                  <button>View all comments</button>
                </Link>
              </span>
            </p>
            <p>
              <input
                onChange={(e) => setUserComment(e.target.value)}
                type="text"
                placeholder="Add a comment..."
              />
              <SendIcon onClick={AddComment} style={{ cursor: "pointer" }} />
            </p>
          </PostBottom>
        </Content>
      </Container>
    </motion.div>
  );
};

export default Post;

const Container = styled.div`
  margin-top: 25%;
  padding: 8px;
  width: 70%;
  @media (max-width:760px) {
    width:70vw;
    padding:0;
    margin: 42px 0;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const PostTop = styled.div`
  width: 100%;
  height: 10%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & h5 {
      margin-left: 8px;
    }
  }
`;

const PostMiddle = styled.div`
  width: 100%;
  height: 70%;
  & img {
    width: 100%;
    border-radius: 8px;
    border: 1px solid lightgray;
    height: 100%;
    object-fit: cover;
    min-height: 400px;
  }
`;

const PostBottom = styled.div`
  height: 20%;
  width: 100%;
  border-top: 1px solid lightgray;
  & p {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & input {
    width: 60%;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 4px;
  }
  & .Post__font-light > span > button {
    color: lightgray;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 4px;
  }
`;

const PostTopHidden = styled.div`
  width: 20%;
  position: absolute;
  right: 0;
  border: 1px solid lightgray;
  background-color: #fff;
  color: black;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Icons = styled.div`
  display: flex;
  & p >  .MuiSvgIcon-root {
   padding:4px;

  }
  & p {
  
    margin:4px;
  }
`;
