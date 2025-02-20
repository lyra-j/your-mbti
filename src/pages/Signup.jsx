import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Signup = () => {
  return (
    <div className="bg-gray-100 w-full flex flex-col items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h1>Signup</h1>
        {/* 회원가입 폼 */}
        <AuthForm></AuthForm>
      </div>

      <div className="mt-4">
        <p className="text-gray-600">
          이미 계정이 있으신가요?
          <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
