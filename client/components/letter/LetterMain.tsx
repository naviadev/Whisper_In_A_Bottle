import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

// import { useSocket } from "../../components/SocketContext";
import useLetteContainerHooks from "../../hooks/letterView/useLetterHooks";
import * as styles from "../../style/letterMain.css";

import LetterListInnerContent from "./LetterContent";

/**
 * @ReactComponent : LetterMain
 * 작성자 : @naviadev / 2024-07-23
 * 편집자 : @moonhr / 2024-08-02
 * Issue : WIB-28
 * @return : React.FC
 * @description : Letter 화면에서 출력되는 content 영역. 임시 테스트 컴포넌트로,
 *  ThreeJs를 사용하기 전 까지 기능 테스트를 위한 Component
 */

const LetterMain: React.FC = () => {
  const { isLetterContainerContentMode, isSetLetterContainerContentMode } =
    useLetteContainerHooks();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState<string | null>(null);

  useEffect(() => {
    const newSocket: Socket = io();
    setSocket(newSocket);

    if (newSocket) {
      // 수신된 메시지 감지
      newSocket.on("receive_message", (message) => {
        setReceivedMessage(message);
      });
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      newSocket.off("receive_message");
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (socket && message.trim()) {
      socket.emit("send_message", { content: message });
      setMessage("");
    }
  };

  const handleCheckReceivedMessage = () => {
    if (receivedMessage) {
      isSetLetterContainerContentMode("LetterList");
      setReceivedMessage(null);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.contentContainer}>
        {isLetterContainerContentMode === "PostLetter" ? (
          <textarea
            className={styles.textarea}
            placeholder="내용을 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        ) : (
          <LetterListInnerContent
            className={styles.Content}
            letterHeader={`수신된 편지 - 내용: ${receivedMessage}`}
          />
        )}
      </div>

      <div>
        <button
          className={styles.button}
          type="button"
          onClick={handleSendMessage}
        >
          보내기
        </button>

        <button
          className={styles.button}
          type="button"
          onClick={handleCheckReceivedMessage}
        >
          수신 확인
        </button>
        {receivedMessage && <div>수신된 편지 : 1</div>}
      </div>
    </main>
  );
};

export default LetterMain;
