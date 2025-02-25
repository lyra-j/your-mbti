import { create } from "zustand";
import { getUserProfile } from "../api/auth";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      //인증상태 초기값
      token: sessionStorage.getItem("accessToken") || null,
      isAuthenticated: !!sessionStorage.getItem("accessToken"),
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
        });
        get().fetchUserProfile();
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
    }),
    {
      name: "accessToken", // 저장될 키 이름
      getStorage: () => sessionStorage, // sessionStorage에 저장
    }
  )
);

export default useAuthStore;
