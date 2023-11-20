import React, { useState } from "react";

const EmpAuthContext = React.createContext({
  token: "",
  isEmpLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const EmpAuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("EmpToken");

  const [token, setToken] = useState(initialToken);

  const EmpIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("EmpToken");
  };

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("EmpToken", token);

    const remainingTime = calculateRemainingTime(expirationTime);

    setTimeout(logoutHandler, remainingTime);
  };

  const EmpContextValue = {
    token: token,
    isEmpLoggedIn: EmpIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <EmpAuthContext.Provider value={EmpContextValue}>
      {props.children}
    </EmpAuthContext.Provider>
  );
};

export default EmpAuthContext;
