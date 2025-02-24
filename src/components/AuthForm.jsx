import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hook/useForm";
import { AuthContext } from "../context/AuthContext";
import { apilogin, register } from "../api/auth";

const AuthForm = ({ mode }) => {
  const isLoginMode = mode === "login";
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const { formData, handleChange, resetForm } = useForm({
    id: "",
    password: "",
    nickname: "",
  });

  // Login login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // NOTE: login
      const data = await apilogin({
        id: formData.id,
        password: formData.password,
      });

      alert("로그인 완료");
      // 로그인 상태를 브라우저에 저장
      loginUser(data.accessToken);
      navigate("/profile");
    } catch (error) {
      console.error("Login error", error);
      alert("로그인에 실패했습니다.");
      // alert(error.response.data.message);
    }
  };

  // Signup logic
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // NOTE: signup
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
      //   alert(`오류 캐치 : ${error.response.data.message} || "네트워크 오류"`);
    }
  };

  return (
    <div>
      <form
        onSubmit={mode === "login" ? handleLogin : handleSignup}
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

        {/* 회원가입시 보이는 닉네임 input */}
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
          {isLoginMode ? "로그인" : "회원가입"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
