import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/Log";
import Trends from "../components/Trends";
import FriendsHint from "../components/Profil/FriendsHint";
import { authenticationService } from "../services/auth.service";

const Home = () => {
  const [currentUser, setCurrentUser] = useState('')
  useEffect(() => {
    authenticationService.currentUser.subscribe((user) => setCurrentUser(user));
     
  }, [authenticationService.currentUser])
  
  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">
          {currentUser && currentUser.id ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <Thread />
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
            {currentUser && currentUser.id && <FriendsHint />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
