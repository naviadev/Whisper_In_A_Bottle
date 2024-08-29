// src/client/minimap/minimap.tsx
"use client";
import React from "react";

import { useMinimap } from "./context/minimap_context";
import { useAll } from "../../context/all_context";
import LoginForm from "@client/src/components/minimap/login/login_form";
import RegisterForm from "@client/src/components/minimap/register/register_form";
import MyForm from "@client/src/components/minimap/user/my_form";

const Minimap: React.FC = () => {
  const { isLogin, setIsLogin } = useMinimap();
  const { getToken, setGetToken } = useAll();
  //로그인 전 토큰 없을 시
  if (!getToken) {
    if (!isLogin) {
      return (
        <div>
          <RegisterForm />
        </div>
      );
    }

    if (isLogin) {
      return (
        <div className="w-[202px] h-[248px] bg-zinc-200">
          <LoginForm />
        </div>
      );
    }
  } else {
    //토큰 발급 후
    <MyForm />;
  }
};

export default Minimap;
