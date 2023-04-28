import React from "react";
import styled from "styled-components";
import { useAnimationFrame } from "framer-motion";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../assets/SoPo.png";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import { Avatar } from "@mui/material";

const Header = () => {
  return (
    <Container>
      <Content>
        <NavBar>
          <NavContent>
            <NavTop>
              <Link to="/">
                <img src={Logo} alt="" />
              </Link>
            </NavTop>
            <hr />
            <NavMainContent>
              <Link to="/Home">
                <motion.li whileHover={{ scale: 1.04 }}>
                  <HomeIcon />
                  <p>Home </p>
                </motion.li>{" "}
              </Link>
              <Link to="/Friends">
                {" "}
                <motion.li whileHover={{ scale: 1.04 }}>
                  <PeopleAltIcon />
                  <p>Friends </p>
                </motion.li>{" "}
              </Link>
              <Link to="/Explore">
                {" "}
                <motion.li whileHover={{ scale: 1.04 }}>
                  <ExploreIcon />
                  <p>Explore </p>
                </motion.li>{" "}
              </Link>
              <Link to="/PostCreate">
                {" "}
                <motion.li whileHover={{ scale: 1.04 }}>
                  <AddIcon />
                  <p>Create post </p>
                </motion.li>{" "}
              </Link>
              <Link to="/Search">
                {" "}
                <motion.li whileHover={{ scale: 1.04 }}>
                  <SearchIcon />
                  <p>Search </p>
                </motion.li>{" "}
              </Link>
              <Link to="/Saved">
                {" "}
                <motion.li whileHover={{ scale: 1.04 }}>
                  <BookmarkIcon />
                  <p>Saved </p>
                </motion.li>{" "}
              </Link>
              <Link to="/Me" className="avatarHead">
                {" "}
                <motion.li whileHover={{ scale: 1.04 }}>
                  <Avatar style={{ width: "30px", height: "30px" }} />
                  <p>Me </p>
                </motion.li>
              </Link>
              <Link to="/Settings">
                {" "}
                <motion.li whileHover={{ scale: 1.04 }}>
                  <SettingsIcon />
                  <p>Settings </p>
                </motion.li>
              </Link>
            </NavMainContent>
          </NavContent>
        </NavBar>
      </Content>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  background-color: #fff;
  color: black;
  width: 20%;
  height: 100%;
  position: fixed;
  left: 0;
  border-right: 4px solid lightgray;
  @media (max-width: 760px) {
    position: fixed;
    bottom: 0;
    height: 10%;
    width: 100%;
    & hr {
      display: none;
    }
  }
`;

const NavBar = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0a092b;
`;

const NavTop = styled.div`
  width: 100%;
  height: 20%;
  border-bottom: 2px solid lightgray;
  @media (max-width: 760px) {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    height: 15%;
    background-color: #0a092b;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    @media (max-width: 760px) {
      width: 276px;
    }
  }
`;

const NavContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const NavMainContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px;
  @media (max-width: 760px) {
    flex-direction: row;
  }
  .MuiAvtar-root {
    width: 12px;
  }
  & a {
    text-decoration: none;
    @media (max-width: 760px) {
      width: 50px;
    }
  }

  & li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px;
    color: #fff;
    @media (max-width: 760px) {
      padding: 8px;
      margin: 5px;
    }

    & p {
      padding: 8px;
      margin: 2px;
      list-style: none;
      color: #fff;
      text-decoration: none;
      font-size: large;
      @media (max-width: 760px) {
        display: none;
      }
    }
  }
  @media (max-width: 760px) {
    .avatarHead {
      position: fixed;
      top: 0%;
      right: 18%;
      z-index: 9999999999999999999999999999999999999999999999999999999;
    }
    & .MuiAvatar-root {
      width:60px !important;
      height:50px !important;
    }
  }
`;
