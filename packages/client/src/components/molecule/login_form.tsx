import React from "react";
import useLoginHooks from "@client/src/hooks/auth/use_login_hook";
import { useMinimap } from "@client/src/app/(organism)/minimap/context/minimap_context";
import Form from "../atom/form/form";
import Input from "../atom/input/input";
import Button from "../atom/button/button";
import P from "../atom/p/p";
import LoginInput from "../atom_static/login_input";

const LoginForm = () => {
  const { id, password, setId, setPassword, handleLogin } = useLoginHooks();
  const { setIsLogin } = useMinimap();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin();
  };

  const handleSignUpClick = () => {
    setIsLogin(false);
  };

  return (
    <div className="h-full">
      <Form
        onSubmit={onSubmit}
        className="h-full flex flex-col items-center justify-evenly"
      >
        <P className="text-[14px]  text-minimap-text " text="Login" />
        <LoginInput
          changeEvent={setId}
          type="text"
          value={id}
          id="email-input"
          placeholder="Email"
        />
        <LoginInput
          changeEvent={setPassword}
          type="password"
          value={password}
          id="password-input"
          placeholder="Password"
        />
        <Button
          onClick={handleSignUpClick}
          className=" text-[10px]"
          text="Sign up"
        />
      </Form>
    </div>
  );
};

export default LoginForm;
