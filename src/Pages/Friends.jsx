import { Avatar } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import UserRecommendation from "../Components/userRecommendation";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAuthStatusAndData } from "../Redux/Users.";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom";
import { SendNotification, setNotification } from "../Redux/Notifications";

const Friends = ({ BackendUrl }) => {
  const { UserData } = useSelector((state) => state.Users);
  const [Friend, setFriend] = useState([]);
  const [Loader, setLoader] = useState(false);

  const unFriend = async (FriendId, userId) => {
    setLoader(true);
    try {
      const removeFriend = await axios.delete(
        `${BackendUrl}/friends/remove?friendId=${FriendId}&userId=${userId}`
      );
      getFriends();
      setLoader(false);
      dispatch(
        setNotification({
          message: "Unfriend successfully",
          success: "true",
        })
      );

      dispatch(SendNotification());
    } catch (error) {
      setLoader(false);
      console.error(error.message);
    }
  };

  const getFriends = async () => {
    setLoader(true);
    try {
      const friend = await axios.get(
        `${BackendUrl}/friends/all?userId=${UserData.data._id}`
      );
      setFriend(friend.data.data);
      setLoader(false);
    } catch (error) {
      setLoader(false);

      console.error(error.message);
    }
  };

  useState(() => {
    getFriends();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{margin: "20% 0"}}
    >
      <h1>Your Friends</h1>
      {Loader ? (
        <Loading />
      ) : (
        <>
          {Friend.length !== 0
            ? Friend.map((friend) => (
                <>
                  <UserRecommendation
                    FriendId={friend.FriendId}
                    FriendName={friend.FriendName}
                    unFriend={unFriend}
                    userId={friend.UserId}
                  />
                </>
              ))
            : "No Friends"}
        </>
      )}
    </motion.div>
  );
};

export default Friends;
