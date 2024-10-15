import React from "react";
import useLoginHooks from "@client/src/hooks/auth/use_login_hook";
import { useMinimap } from "@client/src/app/(organism)/minimap/context/minimap_context";
import Form from "../atom/form/form";
import Input from "../atom/input/input";
import Button from "../atom/button/button";
import P from "../atom/p/p";
import LoginInput from "../atom_static/login_input";
import "./login_form.css";
import { useAll } from "@client/src/app/context/all_context";

const LoginForm = () => {
  const { id, password, setId, setPassword, handleLogin } = useLoginHooks();
  const { setIsLogin } = useMinimap();
  const { setUserId } = useAll();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserId(id);
    await handleLogin();
  };

  const handleSignUpClick = () => {
    setIsLogin(false);
  };

  return (
    <div className="h-full">
      <Form
        onSubmit={onSubmit}
        className="h-full flex flex-col items-center justify-evenly w-full"
      >
        <P className="text-[12px] text-minimap-text " text="Login" />
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
        <button type="submit" className="login-button">
          login
        </button>
        <Button
          onClick={handleSignUpClick}
          className="text-[8px] text-minimap-text opacity-50 hover:opacity-100"
          text="Sign up"
        />
      </Form>
    </div>
  );
};

export default LoginForm;
