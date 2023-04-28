import axios from "axios";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { motion } from "framer-motion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loading from "../Components/Loading";
import { SendNotification, setNotification } from "../Redux/Notifications";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LikedImage from "../assets/likes.gif";
import likesPng from "../assets/likes.png";

const PostInDetails = ({ BackendUrl }) => {
  const [PostData, setPostData] = useState([]);
  const [PostCommentData, setPostCommentData] = useState([]);
  const [showHidden, setSHowHidden] = useState(false);
  const [UserComment, setUserComment] = useState("");
  const [newComment, setnewComment] = useState("");
  const [Loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { UserData } = useSelector((state) => state.Users);
  const [openedCommentId, setOpenedCommentId] = useState(null);
  const [inputPassStatus, setInputPassStatus] = useState(false);
  const [likedPost, setLikedPost] = useState(false);
  const [Disablelike, setLikeDisable] = useState(false);

  const { UserId } = useParams();

  const changeHiddenState = () => {
    setSHowHidden(!showHidden);
  };

  const getComments = async () => {
    setLoader(true);
    const comments = await axios.post(
      `${BackendUrl}/comments/getComments`,
      {
        PostId: UserId,
      },
      {
        withCredentials: true,
      }
    );
    setLoader(false);
    setPostCommentData(comments.data.data);
  };

  const getPostInDetail = async () => {
    setLoader(true);
    const post = await axios.post(
      `${BackendUrl}/post/getAllpostByUserId`,
      {
        PostId: UserId,
      },
      {
        withCredentials: true,
      }
    );
    setLoader(false);
    setPostData(post.data.data);
  };
  useEffect(() => {
    getPostInDetail();
    getComments();
  }, []);

  const unLikePost = async () => {
    const like = await axios.post(`${BackendUrl}/post/like`, {
      postId: UserId,
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
      postId: UserId,
      like: 1,
    });
    setLikeDisable(true);
    setLikedPost(true);
    getPostInDetail();
    setTimeout(() => {
      setLikedPost(false);
    }, 2550);
  };

  const handleLikeOnImage = () => {
    if (likedPost) {
      unLikePost();
      getPostInDetail()
    } else {
      likePost();
     getPostInDetail()
    }
  };

  const AddComment = async () => {
    setLoader(true);
    const newComment = await axios.post(
      `${BackendUrl}/comments/new`,
      {
        CommenterUserId: UserData.data._id,
        PostId: UserId,
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
    getComments();
  };

  const updateComment = async (CommentId) => {
    const update = await axios.put(`${BackendUrl}/comments/update`, {
      postId: UserId,
      userId: UserData.data._id,
      commentId: CommentId,
      newComment: newComment,
    });
    setLoader(false);
    setInputPassStatus(false);
    dispatch(
      setNotification({
        message: "Updated comment",
        success: "true",
      })
    );
    dispatch(SendNotification());
    setUserComment("");
    getComments();
  };

  const handleUpdate = async (commentId) => {
    setOpenedCommentId(commentId);
    setInputPassStatus(true);
  };
  const handleSave = () => {
    updateComment(openedCommentId);
  };

  const handleDelete = async (commentId) => {
    try {
      const Commentdelete = await axios.post(
        `${BackendUrl}/comments/delete`,
        {
          postId: UserId,
          userId: UserData.data._id,
          commentId: commentId,
        },
        {
          withCredentials: true,
        }
      );
      setLoader(false);
      setInputPassStatus(false);
      dispatch(
        setNotification({
          message: "Deleted comment",
          success: "true",
        })
      );
      dispatch(SendNotification());
      getComments();
    } catch (error) {
      console.error(error.message);
      setLoader(false);
      setInputPassStatus(false);
      dispatch(
        setNotification({
          message: "Can'not delete the comment try again later",
          success: "false",
        })
      );
      dispatch(SendNotification());
      getComments();
    }
  };

   const SavePost = async (Postkey) => {
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

  return (
    <>
      <Container>
        {inputPassStatus ? (
          <motion.div
            initial={{ top: 0 }}
            animate={{ top: "30%" }}
            onEnded={{ top: "30%" }}
            style={{
              width: "40%",
              position: "fixed",
              backgroundColor: "white",
              top: "50%",
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
                value={newComment}
                onChange={(e) => setnewComment(e.target.value)}
                type="text"
                placeholder="Edited comment"
                style={{
                  background: "#FFFF",
                  color: "black",
                  border: "1px solid black !important",
                  borderRadius: "8px",
                  margin: "12px",
                  padding: "12px",
                  outline: "none",
                }}
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
                onClick={handleSave}
              >
                Save
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
                onClick={() => setInputPassStatus(!inputPassStatus)}
              >
                Cancel
              </p>
            </div>
          </motion.div>
        ) : (
          ""
        )}
        <Content>
          {Loader ? (
            <Loading />
          ) : (
            <>
              <PostTop>
                <p onClick={() => navigate(`/soper/${name}`)}>
                  <Avatar src={PostData.imageURL} />
                  <h5>{!PostData.name ? "Anonymous" : PostData.name}</h5>
                </p>
                <motion.p
                  whileHover={{ scale: 1.1, cursor: "pointer" }}
                  onClick={changeHiddenState}
                >
                  <MoreVertIcon />
                </motion.p>
                {showHidden ? (
                  <PostTopHidden
                    style={{
                      border: "1px solid lightgray",
                      borderRadius: "12px",
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <CloseIcon onClick={changeHiddenState} />
                      <motion.p
                        onClick={() => window.open(PostData.imageURL, "_blank")}
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
                <motion.img
                  src={PostData.imageURL}
                  onDoubleClick={handleLikeOnImage}
                />
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
                    <CommentIcon />
                  </motion.p>
                  <motion.p whileHover={{ scale: 1.1, cursor: "pointer" }}>
                    <TurnedInNotIcon onClick={() => SavePost(UserId)} />
                  </motion.p>
                </Icons>
                <p>
                  <span>{PostData.likes} likes</span>
                </p>
                <p>{PostData.des}</p>
                <p>
                  <input
                    type="text"
                    onChange={(e) => setUserComment(e.target.value)}
                    value={UserComment}
                    placeholder="Add a comment..."
                  />
                  <SendIcon
                    style={{ cursor: "pointer" }}
                    onClick={AddComment}
                  />
                </p>
                <Comment id="comment">
                  {PostCommentData
                    ? PostCommentData.map((comment) => (
                        <div className="CommentContainer">
                          <p key={comment._id}>
                            <div className="commentPacker">
                              <div className="COmmentCOntent">
                                <Avatar />
                                <h4>
                                  {comment.Name ? comment.Name : "Anonymous"}
                                </h4>
                              </div>
                            </div>

                            <span>{comment.Comment}</span>
                            {UserData.data._id == comment.UserId ? (
                              <>
                                <div style={{ display: "flex" }}>
                                  <motion.p
                                    whileHover={{
                                      scale: "1.3",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <EditIcon
                                      onClick={() => handleUpdate(comment._id)}
                                      style={{ margin: "0 8px" }}
                                    />
                                  </motion.p>
                                  <motion.p
                                    whileHover={{
                                      scale: "1.3",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <DeleteIcon
                                      onClick={() => handleDelete(comment._id)}
                                      style={{ margin: "0 8px" }}
                                    />
                                  </motion.p>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </p>
                        </div>
                      ))
                    : ""}
                </Comment>
              </PostBottom>
            </>
          )}
        </Content>
      </Container>
    </>
  );
};

export default PostInDetails;

const Container = styled.div`
  padding: 8px;
  width: 50%;
  @media (max-width:760px) {
    width:95%;
    margin: 20% 0;
  }
`;

const Content = styled.div`
  width: 100%;
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
  border: 1px solid lightgray;
  border-radius: 8px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  width: 9vw;
  padding: 8px;
  position: absolute;
  border-radius: 10px;
  right: 0px;
  border: 1px solid lightgray;
  background-color: rgb(255, 255, 255);
  color: black;
  align-items: center;
  flex-direction: column;
  @media (max-width:760px) {
    width: 20vw;
    
  }
`;

const Icons = styled.div`
  display: flex;
  & .MuiSvgIcon-root {
    margin: 8px !important;
  }
`;

const Comment = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  & .CommentContainer {
    border-radius: 12px;
    width: 100%;
    padding: 12px;
    background-color: #18183c;
    margin: 8px;
    display: flex;
    & .COmmentCOntent {
      width: 100%;
      display: flex;
      align-items: center;
      & h4 {
        margin-left: 8px;
      }

      & .MuiSvgIcon-root {
        align-self: flex-end;
      }
    }
  }

  & p > div > h4 {
    margin: 8px;
  }
  & p {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    & span {
      margin: 12px;
    }
  }
  & p > div {
    display: flex;
    align-items: center;
  }
  & .commentPacker {
    width: 100%;
    justify-content: space-between;
    align-items: baseline;
  }
`;
