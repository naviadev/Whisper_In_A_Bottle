import React, { useState } from "react";
import { useSocket } from "@client/src/app/context/socket_context";
import { useView } from "@client/src/app/(organism)/view/context/view_context";

/**
 * * 작성된 편지를 보내기 위한 뷰 컴포넌트
 * @returns
 */
export const WirteLetterView = () => {
  const [message, setMessage] = useState("");

  const socket = useSocket();

  const { setSendLetter } = useView();

  const handleSendMessage = () => {
    if (socket && message.trim()) {
      socket.emit("espresso", { content: message });
      setMessage("");
      setSendLetter(false);
    }
  };

  const handleCloseWirteLetterView = () => {
    setSendLetter(false);
  };

  return (
    <div>
      <textarea
        placeholder="내용을 입력하세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>보내기</button>
      <button onClick={handleCloseWirteLetterView}>닫기</button>
    </div>
  );
};
