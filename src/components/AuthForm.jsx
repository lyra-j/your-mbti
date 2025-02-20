import React, { useState } from "react";

// 회원가입인지 로그인인지 구분하기 위해 mode 를 props 로 받습니다.
// onSubmit 도 회원가입과 로그인 페이지에서 각각 구현을 하고 props 로 넘겨줄 겁니다.

const AuthForm = ({ mode, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, password } = formData;
    // mode === 'signup'
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
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
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호"
          required
          className="w-full p-4 border border-gray-200 rounded-lg"
        />

        {/* 회원가입시 보이는 닉네임 input */}
        {mode === "signup" && (
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임"
            required
            className="w-full p-4 border-gray-200 rounded-lg"
          />
        )}
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-gray-200 transition duration-300 hover:text-[#ff5a5f]"
        >
          {mode === "login" ? "로그인" : "회원가입"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
