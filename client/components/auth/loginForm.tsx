import React from "react";
import Link from "next/link";

import { loginForm, input, button, link } from "../../style/loginForm.css";
const LoginForm = () => {
  return (
    <div className={loginForm}>
      <input type="email" placeholder="Email" className={input} />
      <input type="password" placeholder="Password" className={input} />
      <button type="submit" className={button}>
        Send
      </button>
      <Link href="/register" className={link}>
        처음이신가요? 회원가입
      </Link>
    </div>
  );
};

export default LoginForm;
