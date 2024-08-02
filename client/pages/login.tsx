import React from "react";

import LoginForm from "../components/auth/loginForm";
import SocketProvider from "../components/letter/LetterProvider";

const LoginPage = () => {
  return (
    <SocketProvider>
      <div>
        <LoginForm />
      </div>
    </SocketProvider>
  );
};

export default LoginPage;
