import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../zustand/authStore";

const Header = () => {
  // AuthStore에서 로그인 상태 및 로그아웃 함수 가져오기
  const { isAuthenticated, logoutUser } = useAuthStore();
  const navigate = useNavigate();

  // ✅ 로그아웃 함수
  const handleLogout = () => {
    const confirmLogout = window.confirm("정말로 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logoutUser(); // 인증상태 변경 및 토큰 삭제
      navigate("/");
    }
  };

  return (
    <header className="w-full h-[60px] bg-violet-700 text-white flex items-center justify-center shadow-md sticky top-0 z-10">
      <nav className="max-w-screen-xl w-full h-full flex items-center justify-between px-8 sm:px-4">
        {/* 로고 & 홈으로 */}
        <Link
          to="/"
          className="text-3xl font-extrabold flex items-center cursor-pointer text-[#efefef] italic"
        >
          Your MBTI
        </Link>
        <div className="flex justify-center gap-4 items-center cursor-pointer text-[#e7e7e7]">
          {/* 로그인 ❌ 메뉴 */}
          {!isAuthenticated ? (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </>
          ) : (
            // 로그인 ⭕️ 메뉴
            <>
              <Link to="/profile">프로필</Link>
              <Link to="/test">테스트</Link>
              <Link to="/results">결과보기</Link>
              <button
                onClick={handleLogout}
                className="font-normal py-1 px-4 rounded-lg transition-all bg-[#fbfaf8] text-[#383838] hover:bg-[#404040] hover:text-white"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
