import { Avatar } from "@mui/material";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../Firebase/config";
import axios from "axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "./Loading";

const PostModel = ({ BackendUrl }) => {
  const [showHidden, setSHowHidden] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [Posttitle, setPostTitle] = useState("");
  const [PostDesc, setPostDesc] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);
  const [Loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { UserData } = useSelector((state) => state.Users);
  console.log(UserData)

  const handleFiles = (e) => {
    const file = e.target.files[0];
    setImagePath(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const Store = async () => {
    const imageRef = ref(storage, `posts/${imagePath.name}`);
    setLoader(true);
    try {
      const snapshot = await uploadBytes(imageRef, imagePath);
      const url = await getDownloadURL(snapshot.ref);
      setImageUrl(url);
      const Post = await axios.post(`${BackendUrl}/post/createpost`, {
        title: Posttitle,
        desc: PostDesc,
        imageURL: url,
        likes: 0,
        comments: "default comment",
        userId: UserData.data._id,
        name: UserData.data.name
      });
      setLoader(false);
      setImagePath("")
      setPostDesc("")
      setPostTitle("")
    } catch (error) {
      setLoader(false);
      setLoader(false);
      dispatch(
        setNotification({
          message: error.response.data.message,
          success: "false",
        })
      );
      dispatch(SendNotification());
    }
  };

  return (
    <Container>
      <Content>
        <PostMiddle onClick={handleButtonClick}>
          {Loader ? (
            <div style={{height:"20%"}}>
              <Loading />

            </div>
          ) : (
            <>
              {imagePath ? (
                <>
                  <CloseIcon className="CloseIco" onClick={() => setImagePath("")} />
                  <ImagePreview
                    style={{ zIndex: 99999999, position: "relative" }}
                    src={URL.createObjectURL(imagePath)}
                  />
                </>
              ) : (
                <ImagePlaceHolder>
                  <motion.span whileHover={{ scale: 1.1, cursor: "pointer" }}>
                    <AddCircleIcon />
                  </motion.span>

                  <InputField
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFiles}
                    required
                  />
                </ImagePlaceHolder>
              )}
            </>
          )}
        </PostMiddle>
        <PostBottom>
          <p>
            <input
              value={Posttitle}
              onChange={(e) => setPostTitle(e.target.value)}
              type="text"
              placeholder="Post title"
              required
            />
            <input
              value={PostDesc}
              onChange={(e) => setPostDesc(e.target.value)}
              type="text"
              placeholder="Post description"
              required
            />
          </p>
          <span>
            <motion.button
              whileHover={{ scale: 1.01, cursor: "pointer" }}
              type="submit"
              disabled={PostDesc == "" ? true : false}
              onClick={Store}
            >
              Post
            </motion.button>
          </span>
        </PostBottom>
      </Content>
    </Container>
  );
};

export default PostModel;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-height: 400px;
  min-height: 300px;
 
`;

const Container = styled.div`
  margin: 22px 0 30px 0;
  padding: 8px;
  width: 30%;
  height: 90vh;
  max-height: 1000px;
  @media (max-width:760px) {
    width:85%;
    margin:20% 0;
    height:100%;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const PostMiddle = styled.div`
  width: 100%;
  height: 70%;
  border: 0.1px solid lightgray;
  border-radius: 8px;
  position: relative;
  @media (max-width:760px) {
    max-height: 450px;
    min-height: 400px;
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    padding: 12px;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  & .CloseIco {
    position: absolute;
    right: 0;
    z-index: 999999999999999;
    background-color: #f4f4f4;
    color:black;
    border-radius: 33px;
    @media (max-width: 760px) {
      top:5%;
      right:5%;
      z-index: 9999;
    }
  }
`;

const PostBottom = styled.div`
  height: 20%;
  width: 100%;

  & p {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
  }
  & input {
    width: 60%;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid lightgray;
    outline: none;
    padding: 4px;
    margin: 12px;
  }
  & span > button {
    width: 50%;
    color: lightgray;
    background-color: #3d3df6;
    border: 1px solid lightgray;
    outline: none;
    padding: 8px;
    align-self: center;
    :disabled {
      background-color: #6363d6;
      cursor: not-allowed !important;
    }
  }
`;

const InputField = styled.input`
  display: none;

  height: 100%;
  width: 100%;
`;

const ImagePlaceHolder = styled.div`
  display: flex;
  width: 100;
  height: 100%;
  justify-content: center;
  align-items: center;
  & span {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .MuiSvgIcon-root {
    height: 100%;
    width: 20%;
  
  }
`;
