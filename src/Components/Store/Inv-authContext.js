import React, { useState } from "react";

const InvAuthContext = React.createContext({
  token: "",
  isInvLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const InvAuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("InvToken");

  const [token, setToken] = useState(initialToken);

  const InvIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("InvToken");
  };

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("InvToken", token);

    const remainingTime = calculateRemainingTime(expirationTime);

    setTimeout(logoutHandler, remainingTime);
  };

  const invContextValue = {
    token: token,
    isInvLoggedIn: InvIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <InvAuthContext.Provider value={invContextValue}>
      {props.children}
    </InvAuthContext.Provider>
  );
};

export default InvAuthContext;
