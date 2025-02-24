import React, { createContext, useEffect, useState } from "react";
import { getUserProfile } from "../api/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const token = sessionStorage.getItem("accessToken");
  // 인증상태 state
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const [user, setUser] = useState(null);

  // 사용자 로그인
  const loginUser = (token) => {
    // 로그인 상태 브라우저에 저장
    sessionStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  // 사용자 로그아웃
  const logoutUser = () => {
    sessionStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     if (!accessToken) return;
  //     try {
  //       const res = await getUserProfile(accessToken);
  //       setUser(res);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };

  //   fetchUserInfo();
  // }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loginUser, logoutUser, user, token, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
