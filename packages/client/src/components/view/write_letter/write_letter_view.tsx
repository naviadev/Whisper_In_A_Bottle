import React, { useState, useRef } from "react";
import { useSocket } from "@client/src/app/context/socket_context";
import { useView } from "@client/src/app/(organism)/view/context/view_context";

/**
 * * 작성된 편지를 보내기 위한 뷰 컴포넌트
 * @returns
 */
export const WirteLetterView = () => {
  const [message, setMessage] = useState("");
  const waterSplashSoundRef = useRef<HTMLAudioElement>(null);

  const socket = useSocket();

  const { setSendLetter } = useView();

  const handleSendMessage = () => {
    if (socket && message.trim()) {
      socket.emit("espresso", { content: message });
      waterSplashSoundRef.current?.play();
      console.log("message", message);
      setMessage("");
      setSendLetter(false);
    }
  };

  const handleCloseWirteLetterView = () => {
    setSendLetter(false);
  };

  return (
    <>
      <div className="absolute z-10 w-[60%] h-full">
        <textarea
          placeholder="write your letter"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-full bg-transparent focus:outline-none placeholder:text-black"
        />
        <div className="flex justify-between w-full">
          <button onClick={handleSendMessage} className="">
            Send
          </button>
          <button onClick={handleCloseWirteLetterView} className="">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
