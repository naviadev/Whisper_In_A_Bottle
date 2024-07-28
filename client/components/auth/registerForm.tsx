import React from "react";

import useRegisterHooks from "../../hooks/authView/useRegisterHooks";
import { registerForm, input, button } from "../../style/registerForm.css";

const RegisterForm = () => {
  const { setId, setPassword, setPasswordCheck, handleRegister } =
    useRegisterHooks();

  return (
    <div className={registerForm}>
      <input
        type="text"
        placeholder="ID"
        className={input}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className={input}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className={input}
        onChange={(e) => setPasswordCheck(e.target.value)}
      />
      <button type="button" className={button} onClick={() => handleRegister()}>
        Register
      </button>
    </div>
  );
};

export default RegisterForm;
