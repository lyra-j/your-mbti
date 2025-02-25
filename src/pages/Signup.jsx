import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Signup = () => {
  return (
    <div className="bg-gray-50 w-full flex flex-col items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-5">Signup</h2>

        {/* 회원가입 폼 */}
        <AuthForm mode="signup" />

        {/* 로그인 링크 */}
        <div className="mt-4">
          <p className="text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link
              to="/login"
              className="font-semibold text-violet-600 hover:text-red-600"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
