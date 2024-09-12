import React from "react";

import useRegisterHooks from "@client/src/hooks/auth/use_register_hooks";
import { useMinimap } from "@client/src/app/(organism)/minimap/context/minimap_context";

const RegisterForm = () => {
  const { setId, setPassword, setPasswordCheck, handleRegister } =
    useRegisterHooks();
  const { isLogin, setIsLogin } = useMinimap();

  //로그인으로 전환
  const handleLoginClick = () => {
    setIsLogin(true);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="ID"
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setPasswordCheck(e.target.value)}
      />
      <button type="button" onClick={() => handleRegister()}>
        Register
      </button>
      <button onClick={handleLoginClick}>로그인으로 이동</button>
    </div>
  );
};

export default RegisterForm;
