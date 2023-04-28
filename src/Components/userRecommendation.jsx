import { Avatar } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom"
import { SendNotification, setNotification } from "../Redux/Notifications";
import { useDispatch } from "react-redux";

const UserRecommendation = ({title,FriendId ,FriendName ,Friend,unFriend ,userId}) => {
  const navigate=useNavigate()
      const [Loader, setLoader] = useState(false);
      const dispatch = useDispatch();
   const handleAddFriend = async () => {
     try {
       const Addfriend = await axios.post(
         `${BackendUrl}/friends/new`,
         {
           friendName: FriendName,
           friendId:FriendId,
           userId: userId,
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <Content>
          <ListTop>
            <h1>{title}</h1>
          </ListTop>
          <List>
            <MyFriends>
              <p onClick={() => navigate(`/soper/${FriendName}`)}>
                <Avatar />
                <span>{FriendName}</span>
              </p>
              <p>
                {Friend !== "not" ? (
                  <motion.span
                    whileHover={{ scale: 1.1, cursor: "pointer" }}
                    className="unFriend__button"
                    onClick={() => unFriend(FriendId, userId)}
                  >
                    Unfriend
                  </motion.span>
                ) : (
                  <motion.span
                    whileHover={{ scale: 1.1, cursor: "pointer" }}
                    className="unFriend__button"
                    onClick={() => handleAddFriend()}
                  >
                    Add Friend
                  </motion.span>
                )}
              </p>
            </MyFriends>
          </List>
        </Content>
      </Container>
    </motion.div>
  );
};

export default UserRecommendation;

const Container = styled.div`
  width: 60%;
  @media (max-width:760px) {
    width: 100%;
    margin:5%;
  } 
`;

const Content = styled.div`
  width: 100%;
`;

const ListTop = styled.div`
  text-align: center;
`;

const List = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const MyFriends = styled.div`
  width: 90%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 8px;
  :hover {
    cursor: pointer;
  }

  & p {
    display: flex;
    align-items: center;
    & span {
      margin: 0 0 0 8px;
    }
  }
  .unFriend__button {
    background-color: #fb2727;
    padding: 4px;
    border-radius: 4px;
  }
`;
