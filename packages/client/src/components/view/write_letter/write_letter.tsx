import React, { useState, useEffect } from "react";
import Image from "next/image";
import { WirteLetterView } from "./write_letter_view";
import { useSocket } from "@client/src/app/context/socket_context";

type WriteLetterPropType = {
  className?: string;
};

/**
 * * 도착한 편지가 나타나는 뷰
 * @param 소켓으로 도착한 메세지
 * @returns
 */
export const WriteLetter: React.FC<WriteLetterPropType> = ({
  className,
}) => {
  return (
    <div className="top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-[#D9D9D9]  bg-opacity-70 relative">
      <div className="w-[60%] h-[60%] relative flex justify-center">
        <WirteLetterView />
        <Image
          src="/ParchmentLetter.jpeg"
          alt="편지 배경"
          layout="fill"
          objectFit="cover"
          className="absolute z-0 rotate-90"
        />
      </div>
    </div>
  );
};
