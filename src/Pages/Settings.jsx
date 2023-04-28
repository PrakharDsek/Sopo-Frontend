import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SettingsEdit from "../Components/SettingsEdit";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SendNotification, setNotification } from "../Redux/Notifications";

const Settings = ({ BackendUrl }) => {
  const [edited, setEdited] = useState("");
  const { UserData } = useSelector((state) => state.Users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reloadPage, setReloadPage] = useState(false);

  const NameUpdate = async (newName, password) => {
    setEdited(true);
    try {
      const setting = await axios.put(
        `${BackendUrl}/user/update/name`,
        {
          userId: UserData.data._id,
          password: password,
          name: newName,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(
        setNotification({
          message: "Updated name successFully",
          type: "success",
        })
      );
      dispatch(SendNotification());
    } catch (error) {
      console.log("error occured");
      dispatch(
        setNotification({
          message: "User with name already exists",
          type: "error",
        })
      );
      dispatch(SendNotification());
    }
  };

  const PasswordUpdate = async (newPass, password) => {
    setEdited(true);
    try {
      const setting = await axios.put(
        `${BackendUrl}/user/update/password`,
        {
          userId: UserData.data._id,
          password: password,
          newPasswword: newPass,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(
        setNotification({
          message: "Updated password successFully",
          success: "true",
        })
      );
      dispatch(SendNotification());
    } catch (error) {
      dispatch(
        setNotification({
          message: "Failed to update password",
          type: "error",
        })
      );
    }
  };
  const BioUpdate = async (bio, password) => {
    setEdited(true);
    const setting = await axios.put(
      `${BackendUrl}/user/update/bio`,
      {
        userId: UserData.data._id,
        password: password,
        bio: bio,
      },
      {
        withCredentials: true,
      }
    );

    dispatch(
      setNotification({
        message: "Updated Bio successFully",
        success: "true",
      })
    );
    dispatch(SendNotification());
  };
  const HobbyUpdate = async (newhobby, password) => {
    try {
      setEdited(true);
      const setting = await axios.put(
        `${BackendUrl}/user/update/hobby`,
        {
          userId: UserData.data._id,
          password: password,
          newHobby: newhobby,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(
        setNotification({
          message: "Updated hobby successFully",
          success: "true",
        })
      );
      dispatch(SendNotification());
    } catch (error) {}
  };

  const Logout = () => {
    localStorage.removeItem("loginToken");
    navigate("/register");
  };

  const AccTypeUpdate = async (typeAcc, password) => {
    try {
      const typeUpdate = await axios.put(
        `${BackendUrl}/user/update/accountType`,
        {
          userId: UserData.data._id,
          password: password,
          Acctype: typeAcc,
        }
      );

      setReloadPage(true);
      dispatch(
        setNotification({
          message: "Updated account type successFully",
          success: "true",
        })
      );
      dispatch(SendNotification());
    } catch (error) {
      dispatch(
        setNotification({
          message: "Already the same type",
          type: "error",
        })
      );
      dispatch(SendNotification());
    }
  };

  useEffect(() => {
    AccTypeUpdate();
  }, [reloadPage]);

  return (
    <Container>
      <Content>
        <MySettings>
          <Profile>
            <SettingsEdit
              BackendUrl={BackendUrl}
              Key="Name"
              Value={UserData.data.name}
              Update={NameUpdate}
              placeValue="Name"
            />
            <SettingsEdit
              BackendUrl={BackendUrl}
              Key="Password"
              Value="---"
              Update={PasswordUpdate}
              placeValue="Password"
            />
            <SettingsEdit
              BackendUrl={BackendUrl}
              Key="hobby"
              Value={UserData.data.hobby}
              Update={HobbyUpdate}
              placeValue="Hobby"
            />
            <SettingsEdit
              BackendUrl={BackendUrl}
              Key="bio"
              Value={UserData.data.bio}
              Update={BioUpdate}
              placeValue="Bio"
            />
            <SettingsEdit
              BackendUrl={BackendUrl}
              Key="Account type"
              Value={UserData.data.accountType}
              Update={AccTypeUpdate}
              placeValue="Account type"
              options
            />
            <motion.button
              style={{
                textAlign: "center",
                margin:0
              }}
              whileHover={{ scale: 1.1, cursor: "pointer" }}
              onClick={Logout}
            >
              Logout
            </motion.button>
          </Profile>
        </MySettings>
      </Content>
    </Container>
  );
};

export default Settings;

const Container = styled.div`
  width: 100%;
  height: 100%;
  @media (max-width:760px) {
    width:100vw;
    margin:20% 0;
  }
`;

const Content = styled.div`
  width: 50%;
  margin-top: 22px;
  @media (max-width:760px) {
    width:100%;
    margin: 0;
    padding:0;
  }
`;

const MySettings = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;

  justify-content: center;
  flex-direction: column;
`;

const Profile = styled.div`
  text-align: center;
  padding: 12px;
  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    margin: 12px;
    border: 1px solid lightgray;
    border-radius: 8px;
    & .MuiSvgIcon-root {
      :hover {
        cursor: pointer;
      }
    }
    & p {
      display: flex;
      align-items: center;
      margin: 12px;
    }
  }
  & button {
    width: 50%;
    background-color: #005380;
    padding: 8px;
    border: none;
    border-radius: 4px;
    margin-left: 22%;
  }
`;
