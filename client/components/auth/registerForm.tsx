import React from "react";

import useRegisterViewModel from "@client/hooks/registerViewModel";

const RegisterForm = () => {
  const { setId, setPassword, setPasswordCheck, handleRegister } =
    useRegisterViewModel();
  return (
    <div className="register-form">
      <input
        type="text"
        placeholder="id"
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="passwordCheck"
        onChange={(e) => {
          setPasswordCheck(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          handleRegister();
        }}
      >
        send
      </button>
    </div>
  );
};

export default RegisterForm;