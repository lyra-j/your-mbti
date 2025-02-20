import React from "react";
import { Link } from "react-router-dom";
import AuthForm from '../components/AuthForm';

const Login = () => {
  return (
    <div>
      <div>
        <h1>Login</h1>
        {/* 로그인 폼 */}
        <AuthForm></AuthForm>
      </div>

      <div>
        <p>
          계정이 없으신가요?
          <Link to="/signup">회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
