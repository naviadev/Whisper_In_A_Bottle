import React, { useRef } from "react";
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
  const { reqLogin } = useAll();
  const { setIsLogin } = useMinimap();

  const idRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idRef.current || !passwordRef.current) return;

    await reqLogin(idRef.current.value, passwordRef.current.value);
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
        <input
          ref={idRef}
          type="text"
          className="bg-gray-200 bg-opacity-50 border-2 border-minimap-borderColor rounded-lg placeholder-italic placeholder-text-black placeholder-opacity-40 w-[138px] h-8 text-[8px] pl-2 text-minimap-text"
          id="email-input"
          placeholder="Email"
        />
        <input
          ref={passwordRef}
          type="password"
          id="password-input"
          placeholder="Password"
          className="bg-gray-200 bg-opacity-50 border-2 border-minimap-borderColor rounded-lg placeholder-italic placeholder-text-black placeholder-opacity-40 w-[138px] h-8 text-[8px] pl-2 text-minimap-text"
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
