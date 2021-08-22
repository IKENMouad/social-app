import React, { useContext, useEffect, useState } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";
import { authenticationService } from "../services/auth.service";

const Profil = () => {
  const [currentUser, setCurrentUser] = useState('')
   
  useEffect(() => {
    authenticationService.currentUser.subscribe((user) => setCurrentUser(user));
  }, [authenticationService.currentUser]);

  return (
    <div className="profil-page">
      {currentUser && currentUser.id ? (
        <UpdateProfil currentUser={currentUser} />
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/log.svg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
