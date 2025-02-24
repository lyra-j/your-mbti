import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Login = () => {
  return (
    <div className="bg-gray-50 w-full flex flex-col items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-5">Login</h2>
        {/* 로그인 폼 */}
        <AuthForm mode="login"></AuthForm>

        <div className="mt-4">
          <p className="text-gray-600">
            계정이 없으신가요?{" "}
            <Link
              to="/signup"
              className="font-semibold text-violet-600 hover:text-[#ff5a5f]"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
