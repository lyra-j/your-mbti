import React, { createContext, useEffect, useState } from "react";
import { getUserProfile } from "../api/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // 브라우저 세션에서 액세스 토큰 가져오기
  const token = sessionStorage.getItem("accessToken");

  // 로그인 인증 state (토큰이 있다면 true, 없으면 false)
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // 사용자 정보 state
  const [user, setUser] = useState(null);

  // ✅ 사용자 프로필 정보 가져오기
  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserProfile = async () => {
        try {
          const userProfile = await getUserProfile(token);
          setUser(userProfile);
        } catch (error) {
          console.error("사용자 정보를 가져오는데 실패했습니다.", error);
        }
      };
      fetchUserProfile();
    }
  }, [isAuthenticated]);

  // ✅ 사용자 로그인
  const loginUser = (token) => {
    // 브라우저 세션에 액세스 토큰 저장
    sessionStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  // ✅ 사용자 로그아웃
  const logoutUser = () => {
    // 브라우저 세션에서 액세스 토큰 삭제
    sessionStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loginUser, logoutUser, user, token, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
