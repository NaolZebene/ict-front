import React, { useState } from "react";

const DepAuthContext = React.createContext({
  token: "",
  isDepLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const DepAuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("DepToken");

  const [token, setToken] = useState(initialToken);

  const DepIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("DepToken");
  };

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("DepToken", token);

    const remainingTime = calculateRemainingTime(expirationTime);

    setTimeout(logoutHandler, remainingTime);
  };

  const depContextValue = {
    token: token,
    isDepLoggedIn: DepIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <DepAuthContext.Provider value={depContextValue}>
      {props.children}
    </DepAuthContext.Provider>
  );
};

export default DepAuthContext;
