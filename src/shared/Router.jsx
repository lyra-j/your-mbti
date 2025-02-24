import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import Test from "../pages/Test";
import TestResults from "../pages/TestResults";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";

// PrivateRoute : 로그인이 필요한 페이지에 접근할 수 있도록 하는 컴포넌트
// 로그인이 되어있지 않은 사용자는 login 페이지로 리다이렉트
const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

// PublicRoute : 로그인이 필요없는 페이지에 접근할 수 있도록 하는 컴포넌트
// 로그인이 되어있는 사용자는 mypage로 리다이렉트
const PublicRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/profile" />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PublicRoute element={Login} />} />
          <Route path="/signup" element={<PublicRoute element={Signup} />} />
          <Route path="/profile" element={<PrivateRoute element={Profile} />} />
          <Route path="/test" element={<PrivateRoute element={Test} />} />
          <Route
            path="/results"
            element={<PrivateRoute element={TestResults} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
