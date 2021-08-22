import axios from "axios";

const rxjs = require("rxjs");

const currentUserSubject = new rxjs.BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationService = {
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

export function useLogin() {
  const login = ({ email, password }) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/login`, {
        email,
        password,
      })
      .then((user) => {
        localStorage.setItem("currentUser", JSON.stringify(user.data));
        currentUserSubject.next(user.data);
        return user;
      })
      .catch((error) => console.log("erorr ", error));
  };

  return login;
}

export function useRegister() {
  const register = ({ name, email, password }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    };

    return fetch(
      `${process.env.REACT_APP_API_URL}api/user/register`,
      requestOptions
    )
      .then((user) => {
        localStorage.setItem("currentUser", JSON.stringify(user));
        currentUserSubject.next(user);
        return user;
      })
      .catch((response) => console.log("response", response));
  };

  return register;
}

function logout() {
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
