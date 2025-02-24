import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hook/useForm";
import { AuthContext } from "../context/AuthContext";
import { apilogin, register } from "../api/auth";

const AuthForm = ({ mode }) => {
  // 현재 모드 확인 (true: 로그인, false: 회원가입)
  const isLoginMode = mode === "login";
  const navigate = useNavigate();

  // AuthContext에서
  const { loginUser } = useContext(AuthContext);

  // 입력 폼 상태관리 커스텀 훅
  const { formData, handleChange, resetForm } = useForm({
    id: "",
    password: "",
    nickname: "",
  });

  // 로그인 함수
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 로그인 API 호출
      const data = await apilogin({
        id: formData.id,
        password: formData.password,
      });

      alert("로그인 완료");
      loginUser(data.accessToken); // 로그인 상태를 브라우저에 저장
      navigate("/profile"); // 프로필 페이지로 이동
    } catch (error) {
      console.error("⛔️Login error", error);
      alert("로그인에 실패했습니다.");
    }
  };

  // 회원가입 함수
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // 회원가입 API 호출
      await register({
        id: formData.id,
        password: formData.password,
        nickname: formData.nickname,
      });

      alert("회원가입 완료");
      navigate("/login");
      resetForm();
    } catch (error) {
      console.error("⛔️Signup error", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div>
      <form
        // 로그인 모드에 따라 핸들러 함수 실행
        onSubmit={isLoginMode ? handleLogin : handleSignup}
        className="bg-gray-50 p-6 rounded-lg shadow-md space-y-6"
      >
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="아이디"
          required
          className="w-full p-4 border border-gray-200 rounded-lg"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호"
          required
          className="w-full p-4 border border-gray-200 rounded-lg"
        />

        {/* 회원가입시에만 보이는 닉네임 input */}
        {!isLoginMode && (
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임"
            required
            className="w-full p-4 border border-gray-200 rounded-lg"
          />
        )}
        <button
          type="submit"
          className="w-full bg-violet-500 text-white py-3 rounded-lg hover:bg-violet-800 transition duration-300"
        >
          {/* 로그인 모드에 따라 보이는 로그인/회원가입 버튼 */}
          {isLoginMode ? "로그인" : "회원가입"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
