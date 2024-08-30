import React from "react";
// import Link from "next/link";
import "./login_form.css";
import useLoginHooks from "@client/src/app/hooks/auth/use_login_hook";
import { useMinimap } from "@client/src/app/(organism)/minimap/context/minimap_context";

const LoginForm = () => {
  const { id, password, setId, setPassword, handleLogin } = useLoginHooks();
  const { isLogin, setIsLogin } = useMinimap();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin();
  };

  //회원가입으로 전환
  const handleSignUpClick = () => {
    setIsLogin(false);
  };

  return (
    <div className="w-full h-full">
      <form
        onSubmit={onSubmit}
        className="w-full h-full flex flex-col items-center relative"
      >
        <p className="login-text">Login</p>
        <input
          type="text"
          placeholder="Email"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="email-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
        />
        <button onClick={handleSignUpClick} className="sign-up">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
