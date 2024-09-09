import React from "react";
import "./login_form.css";
import useLoginHooks from "@client/src/hooks/auth/use_login_hook";
import { useMinimap } from "@client/src/app/(organism)/minimap/context/minimap_context";
import Form from "../atom/form/form";
import Input from "../atom/input/input";
import Button from "../atom/button/button";

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
    <div className="w-full h-full">
      <Form
        onSubmit={onSubmit}
        className="w-full h-full flex flex-col items-center relative"
      >
        <Input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          id="email-input"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password-input"
        />
        <Button
          onClick={handleSignUpClick}
          className="sign-up"
          text="sign up"
        />
      </Form>
    </div>
  );
};

export default LoginForm;
