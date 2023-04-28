import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import PageModel  from "./Components/PageModel";
import Friends from "./Pages/Friends";
import { AnimatePresence, motion } from "framer-motion";
import Explore from "./Pages/Explore";
import Search from "./Pages/Search";
import SavedPosts from "./Pages/SavedPosts";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PostModel from "./Components/PostModel";
import MyProfile from "./Pages/MyProfile";
import ProfileOthers from "./Pages/ProfileOthers";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import PostInDetails from "./Pages/PostInDetails";

function App() {
  const BackendUrl = "https://sopo.onrender.com/api/v1";
  return (
    <div className="App">
      <Toaster />
      <AnimatePresence mode="wait">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PageModel
                  BackendUrl={BackendUrl}
                  Main={<Home BackendUrl={BackendUrl} />}
                />
              }
            />
            <Route
              path="/home"
              element={
                <PageModel
                  BackendUrl={BackendUrl}
                  Main={<Home BackendUrl={BackendUrl} />}
                />
              }
            />
            <Route
              path="/friends"
              element={<PageModel BackendUrl={BackendUrl}  Main={<Friends  BackendUrl={BackendUrl}/>} />}
            />
            <Route
              path="/explore"
              element={<PageModel BackendUrl={BackendUrl}  Main={<Explore  BackendUrl={BackendUrl}/>} />}
            />
            <Route
              path="/search"
              element={<PageModel BackendUrl={BackendUrl}  Main={<Search  BackendUrl={BackendUrl}/>} />}
            />
            <Route
              path="/saved"
              element={
                <PageModel BackendUrl={BackendUrl}  Main={<SavedPosts BackendUrl={BackendUrl} />} />
              }
            />
            <Route
              path="/settings"
              element={
                <PageModel BackendUrl={BackendUrl} Main={<Settings BackendUrl={BackendUrl} />} />
              }
            />
            <Route
              path="/Register"
              element={<Register BackendUrl={BackendUrl} />}
            />
            <Route
              path="/PostCreate"
              element={
                <PageModel BackendUrl={BackendUrl} Main={<PostModel BackendUrl={BackendUrl} />} />
              }
            />
            <Route
              path="/me"
              element={
                <PageModel BackendUrl={BackendUrl} Main={<MyProfile BackendUrl={BackendUrl} />} />
              }
            />
            <Route
              path="/soper/:UserId"
              element={
                <PageModel BackendUrl={BackendUrl} Main={<ProfileOthers BackendUrl={BackendUrl} />} />
              }
            />
            <Route
              path=":page/soper/post/:UserId"
              element={
                <PageModel BackendUrl={BackendUrl} Main={<PostInDetails BackendUrl={BackendUrl} />} />
              }
            />
          </Routes>
        </Router>
      </AnimatePresence>
    </div>
  );
}

export default App;
