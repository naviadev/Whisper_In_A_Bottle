// src/client/minimap/minimap.tsx
"use client";
import React, { useEffect, useState } from "react";

import { useMinimap } from "./context/minimap_context";
import { useAll } from "../../context/all_context";
// import LoginForm from "@client/src/components/minimap/login/login_form";

import MyForm from "@client/src/components/minimap/user/my_form";
import LoginForm from "@client/src/components/molecule/login_form";
import RegisterForm from "@client/src/components/molecule/register_form";

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const Minimap: React.FC = () => {
  const { isLogin, setIsLogin } = useMinimap();
  const { getToken, setGetToken, userId, setUserId } = useAll();
  const [id, setId] = useState<string>("");
  const [date, setDate] = useState<string>("null");

  useEffect(() => {
    setDate(getCurrentDate());
    setId(userId);
  }, [userId]);

  return (
    <div className=" w-full h-full flex flex-col items-center">
      <div className="h-[6px]" />
      <div
        className={` text-xs h-[49px] flex justify-center items-center text-minimap-text`}
      >
        {!getToken ? date : id}
      </div>
      <line className="w-4/5 h-[1px] border-dashed border-[1px] border-black " />
      {/* 날짜 기본 로그인시 사용자 아이디 */}
      <div className="w-full flex h-[198px] items-center justify-center">
        {!getToken ? !isLogin ? <RegisterForm /> : <LoginForm /> : <MyForm />}
      </div>
    </div>
  );
};

export default Minimap;
