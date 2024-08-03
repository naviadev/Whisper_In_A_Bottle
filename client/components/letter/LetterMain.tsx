/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { socketDTO } from "ts/DTOs/socketDTO";

import { useSocket } from "../../components/SocketContext";
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
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState<string | null>(null);
  const socket = useSocket();

  socket?.on("connect", () => {
    console.log("Connected to Socket.io server");
    const socketId = socket.id;
    console.log("Socket ID:", socketId);

    // Socket ID를 서버에 POST 요청으로 전송
    sendSocketIdToServer(socketId);
  });

  //TODO id담아 서버에 저장된 편지 post로 요청
  // 사용자 id와 클라이언트id를 보내주어야함.
  // 사용자 id는 토큰에 존재함. decode로 출력가능.
  // HTTPespresso참일 시 편지 감지
  //[ ] 클라이언트 id
  //[ ] 사용자 id
  const HTTPespresso = async ({
    socketId,
    Id,
  }: socketDTO): Promise<boolean> => {
    try {
      const res: AxiosResponse = await axios.post(
        "http://localhost:3001/letter/espresso",
        socketId,
        Id
      );
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  //TODO post(latte) 요청
  //작성된 편지 보냄
  useEffect(() => {
    if (socket) {
      // 수신된 메시지 감지
      socket.on("new_message", (message) => {
        setReceivedMessage(message);
      });
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      socket?.off("data_received");
      socket?.disconnect();
    };
  }, [socket]);

  //* 애는 필요없음 http post가 할거임
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
