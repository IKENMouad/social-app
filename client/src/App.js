import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { getUser } from "./actions/user.actions";
import { authenticationService } from "./services/auth.service";


const App = () => {
  const [uid, setUid] = useState(null);
   
    useEffect(() => {
    authenticationService.currentUser.subscribe((user) => setUid(user));
  }, [authenticationService.currentUser]);


  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
