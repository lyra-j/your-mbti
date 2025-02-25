import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="h-full bg-gray-50 flex flex-col justify-between">
      {/* 헤더 컴포넌트, 네비게이션 */}
      <Header />

      {/* 메인 컨텐츠 영역 */}
      <main className="container bg-gray-50 mx-auto p-10 main">
        <div className="w-full flex flex-col items-center justify-center bg-gray-50">
          {/* 현재 선택된 라우터의 컴포넌트 렌더링 */}
          <Outlet />
        </div>
      </main>

      {/* 푸터 컴포넌트 */}
      <Footer />
    </div>
  );
};

export default Layout;
