import React, { useCallback, useEffect, useState } from "react";

let logoutTimer: number;

type AuthContextObj = {
  token: string;
  isLoggedIn: boolean;
  login: (token: string, expirationTime: any) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextObj>({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime: any) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retreveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    // 60000 ms = 1m
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider: React.FC = (props) => {
  const tokenData = retreveStoredToken();
  let initialToken: any;
  if (tokenData) {
    initialToken = tokenData.token; // it could return undefined for the first render
  }
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHnadler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token: string, expirationTime: any) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = window.setTimeout(logoutHnadler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      //   console.log(tokenData.duration);
      logoutTimer = window.setTimeout(logoutHnadler, tokenData.duration);
    }
  }, [tokenData, logoutHnadler]);

  const contextValue: AuthContextObj = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHnadler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
