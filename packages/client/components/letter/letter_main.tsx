import React, { useState } from "react";

import useSocketMessagesHook from "../../hooks/letter_view/use_socket_messages_hook";
import { useSocket } from "../socket/socket_context";
import useLetteContainerHooks from "../../hooks/letter_view/use_letter_hooks";
import * as styles from "../../style/letter_main.css";

import LetterListInnerContent from "./letter_content";

/**
 * @ReactComponent : LetterMain
 * 작성자 : @naviadev / 2024-07-23
 * 편집자 : @moonhr / 2024-08-03
 * Issue : WIB-28
 * @return : React.FC
 * @description : Letter 화면에서 출력되는 content 영역. 임시 테스트 컴포넌트로,
 *  ThreeJs를 사용하기 전 까지 기능 테스트를 위한 Component
 */

const LetterMain: React.FC = () => {
  const { isLetterContainerContentMode, isSetLetterContainerContentMode } =
    useLetteContainerHooks();
  const { receivedMessage, setReceivedMessage } = useSocketMessagesHook();
  const [message, setMessage] = useState("");
  const socket = useSocket();

  const handleSendMessage = () => {
    if (socket && message.trim()) {
      socket.emit("espresso", { content: message });
      setMessage("");
    }
  };

  const handleCheckReceivedMessage = () => {
    if (receivedMessage) {
      isSetLetterContainerContentMode("LetterList");
      // setReceivedMessage(null);
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