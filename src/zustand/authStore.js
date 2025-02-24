import { create } from "zustand";
import { getUserProfile } from "../api/auth";

const useAuthStore = create((set) => ({
  // 브라우저 세션에서 액세스 토큰 가져오기
  token: sessionStorage.getItem("accessToken") || null,

  // 로그인 인증 상태 (토큰이 있다면 true, 없으면 false)
  isAuthenticated: sessionStorage.getItem("accessToken"),

  // 사용자 정보
  user: null,

  // ✅ 사용자 프로필 정보 가져오기
  fetchUserProfile: async () => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return;

    try {
      const userProfile = await getUserProfile(token);
      set({ user: userProfile });
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다.", error);
    }
  },

  // ✅ 사용자 로그인
  loginUser: (token, userData) => {
    // 브라우저 세션에 액세스 토큰 저장
    sessionStorage.setItem("accessToken", token);
    set({
      token,
      isAuthenticated: true,
      user: userData,
    });
  },

  // ✅ 사용자 로그아웃
  logoutUser: () => {
    // 브라우저 세션에서 액세스 토큰 삭제
    sessionStorage.removeItem("accessToken");
    set({
      token: null,
      isAuthenticated: false,
      user: null,
    });
  },
}));

export default useAuthStore;
