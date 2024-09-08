// src/client/minimap/minimap.tsx
"use client";
import React, { useEffect, useState } from "react";

import { useMinimap } from "./context/minimap_context";
import { useAll } from "../../context/all_context";
import LoginForm from "@client/src/components/minimap/login/login_form";
import RegisterForm from "@client/src/components/minimap/register/register_form";
import MyForm from "@client/src/components/minimap/user/my_form";

import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
});

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
    <div className="relative w-full h-full flex justify-center">
      <line className="absolute w-[151px] border-dashed border-[1px] border-black top-[21%]" />
      {/* 날짜 기본 로그인시 사용자 아이디 */}
      <div className={`${pressStart2P.className} text-xs absolute top-[10%]`}>
        {!getToken ? date : id}
      </div>
      {!getToken ? !isLogin ? <RegisterForm /> : <LoginForm /> : <MyForm />}
    </div>
  );
};

export default Minimap;
