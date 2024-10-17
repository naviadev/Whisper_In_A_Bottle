import React from "react";
import useRegisterHooks from "@client/src/hooks/auth/use_register_hooks"; // 회원가입 훅을 사용한다고 가정
import { useMinimap } from "@client/src/app/(organism)/minimap/context/minimap_context";
import Form from "../atom/form/form";
import Input from "../atom/input/input";
import Button from "../atom/button/button";
import P from "../atom/p/p";
import LoginInput from "../atom_static/login_input";

const RegisterForm = () => {
  const {
    id,
    password,
    passwordCheck,
    setId,
    setPassword,
    setPasswordCheck,
    handleRegister,
  } = useRegisterHooks();
  const { setIsLogin } = useMinimap();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleRegister();
  };

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  return (
    <div className="h-full">
      <Form
        onSubmit={onSubmit}
        className="h-full flex flex-col items-center justify-evenly w-full"
      >
        <P className="text-[10px] text-minimap-text " text="Register" />
        <LoginInput
          changeEvent={setId}
          type="id"
          value={id}
          id="id-input"
          placeholder="id"
        />
        <LoginInput
          changeEvent={setPassword}
          type="password"
          value={password}
          id="password-input"
          placeholder="Password"
        />
        <LoginInput
          changeEvent={setPasswordCheck}
          type="password"
          value={passwordCheck}
          id="password-check-input"
          placeholder="Confirm Password"
        />
        <Button type="submit" text="확인"/>
      </Form>
        <Button
          onClick={handleLoginClick}
          className="text-[10px] text-minimap-text opacity-50 hover:opacity-100"
          text="Login"
        />
    </div>
  );
};

export default RegisterForm;
