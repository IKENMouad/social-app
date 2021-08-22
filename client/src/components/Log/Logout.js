import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import { authenticationService } from "../../services/auth.service";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/user/logout`)
      .then(() => {
        authenticationService.logout();
        removeCookie("jwt");
      })
      .catch((err) => console.log(err));
  };

  return (
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
