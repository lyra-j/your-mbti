import React from "react";
import Router from "./shared/Router";
import AuthProvider from "./context/AuthContext";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Router />
    </AuthProvider>
  );
}

export default App;
