import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Signup = () => {
  return (
    <div>
      <div>
        <h1>Signup</h1>
        {/* 회원가입 폼 */}
        <AuthForm></AuthForm>
      </div>

      <div>
        <p>
          이미 계정이 있으신가요?
          <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
