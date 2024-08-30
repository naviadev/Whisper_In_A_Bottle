// src/client/minimap/minimap.tsx
"use client";
import React from "react";

import { useMinimap } from "./context/minimap_context";
import { useAll } from "../../context/all_context";
import LoginForm from "@client/src/components/minimap/login/login_form";
import RegisterForm from "@client/src/components/minimap/register/register_form";
import MyForm from "@client/src/components/minimap/user/my_form";

//최상단은 토큰이 없으면 날짜 있으면 사용자 아이디가 띄워진다.
//TODO 사용자 아이디 받아와야함.
//axios로 사용자 이름을 받아온다.
//메모이제이션하여 최상단에 저장해둔다.
//페이지 리로드가 없기 때문에 이 방법이 더 적합하다고 판단함.

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const Minimap: React.FC = () => {
  const { isLogin, setIsLogin } = useMinimap();
  const { getToken, setGetToken } = useAll();

  return (
    <div className="relative w-full h-full">
      <line className="absolute w-[151px] border-dashed border-[1px] border-black left-[12%] top-[21%]" />
      {!getToken ? !isLogin ? <RegisterForm /> : <LoginForm /> : <MyForm />}
    </div>
  );
};

export default Minimap;
