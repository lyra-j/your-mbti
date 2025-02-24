import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // 로그아웃
  const handleLogout = () => {
    const confirmLogout = window.confirm("정말로 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logoutUser();
      navigate("/");
    }
  };

  return (
    <header className="w-full h-[60px] bg-violet-700 text-white flex items-center justify-center shadow-md sticky top-0 z-10">
      <nav className="max-w-screen-xl w-full h-full flex items-center justify-between px-8 sm:px-4">
        <Link
          to="/"
          className="text-3xl font-extrabold flex items-center cursor-pointer text-[#efefef] italic"
        >
          Your MBTI
        </Link>
        <div className="flex justify-center gap-4 items-center cursor-pointer text-[#e7e7e7]">
          {!isAuthenticated ? (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </>
          ) : (
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
