import React from "react";
import Link from "next/link";

import useLoginHooks from "../../hooks/authView/use_login_hooks";
import { loginForm, input, button, link } from "../../style/login_form.css";

const LoginForm = () => {
  const { id, password, setId, setPassword, handleLogin } = useLoginHooks();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
    <div className={loginForm}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Email"
          className={input}
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={button}>
          Send
        </button>
      </form>
      <Link href="/register" className={link}>
        처음이신가요? 회원가입
      </Link>
    </div>
  );
};

export default LoginForm;
