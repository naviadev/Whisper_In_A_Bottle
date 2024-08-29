import React from "react";
// import Link from "next/link";

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
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <button onClick={handleSignUpClick}>회원가입으로 이동</button>
    </div>
  );
};

export default LoginForm;
