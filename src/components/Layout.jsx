import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className='h-full bg-gray-50 flex flex-col justify-between'>
      <Header />
      <main className="container bg-gray-50 mx-auto p-10 main">
        <div className="w-full flex flex-col items-center justify-center bg-gray-50">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
};

export default Layout;
