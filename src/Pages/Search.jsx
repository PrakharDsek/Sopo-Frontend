import { SearchOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import UserRecommendation from "../Components/userRecommendation";
import SearchImage from "../assets/Search.gif";
import NotFOundImage from "../assets/404.gif";
import axios from "axios";
import { useSelector } from "react-redux";



const Search = ({ BackendUrl }) => {
  const [found, setFound] = useState(false);
  const [Searched, setSearched] = useState(false);
  const [data, setData] = useState([]);
  const {UserData} =useSelector((state) => state.Users)


  const [query, setQuery] = useState("");
  const handleSearch = () => {
    setSearched(!Searched);
    getUser();
  };
  const getUser = async () => {
    try {
      const user = await axios.post(
        `${BackendUrl}/user/find`,
        {
          name: query,
        },
        {
          withCredentials: true,
        }
      );
      setData(user.data.data);
      setFound(true)
      console.log(user);
    } catch (error) {
      setFound(false);
    }
  };
  console.log(data.name)
const inputHandler=(e) => {
  setQuery(e.target.value)
  getUser()
}

  return (
    <Container>
      <Content>
        <SearchQuery>
          <h1>Search for people</h1>
          <motion.div whileHover={{ cursor: "pointer" }}>
            <input
              value={query}
              onChange={inputHandler}
              onEnded={inputHandler}
              type="text"
              placeholder="Search on Sopo"
            />
            <SearchOutlined onClick={handleSearch} />
          </motion.div>
        </SearchQuery>
        <SearchResult>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {query === "" ? (
              <img src={SearchImage} />
            ) : (
              <>
                {data.length !== 0 ? (
                  <UserRecommendation
                    title={`Search result for ${query}`}
                    FriendName={data.name}
                    Friend="not"
                    FriendId={data._id}
                    userId={UserData.data._id}
                    key={data._id} // add unique key prop
                  />
                ) : (
                  ""
                )}
                {found === false && <img src={NotFOundImage} />}
              </>
            )}
          </motion.div>
        </SearchResult>
      </Content>
    </Container>
  );
};

export default Search;

const Container = styled.div`
  width: 60%;
  @media (max-width: 760px) {
    width: 65%;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 12px;
  @media (max-width:760px) {
    width:100vw;
    margin:20% 0;
  }
`;

const SearchQuery = styled.div`
  width: 90%;
  height: 30%;
  display: flex;
  align-items: center;
  flex-direction: column;
  & div {
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 4px;
    & .MuiSvgIcon-root {
      border-left: 1px solid lightgray;
    }
  }
  & input {
    width: 90%;
    padding: 8px;
    border-right: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    color: white;
    outline: none;
    background-color: transparent;
  }
`;

const SearchResult = styled.div`
  width: 100%;
  & img {
    height: 100%;
    padding: 4px;
    margin-top: 5px;
    width: 90%;

    @media (max-width: 760px) {
      padding: 0;
      margin: 0;
    }
  }
`;
