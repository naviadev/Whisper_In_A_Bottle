"use client";
import React, { useState, useEffect } from "react";
import { useView } from "./context/view.context";
import { useSocket } from "../../context/socket_context";
import { WriteLetterButton } from "@client/src/components/view/write_letter/write_letter_button";
import { WirteLetterView } from "@client/src/components/view/write_letter/write_letter_view";
import { ReceivedLetterButton } from "@client/src/components/view/received_letter/received_letter_button";
import { ReceivedLetterView } from "@client/src/components/view/received_letter/received_letter_view";

const View: React.FC = () => {
  const socket = useSocket();
  const {
    onLetterView,
    setOnLetterView,
    receivedLetter,
    setReceivedLetter,
    sendLetter,
    setSendLetter,
  } = useView();

  const [receivedMessage, setReceivedMessage] = useState<string | null>(null);

  useEffect(() => {
    if (socket) {
      //사용자가 연결 되었음을 알리기 위한 socket 이벤트. 내용은 비어있음.
      socket.emit("initial_data");

      socket.on("latte", (message: { [key: string]: string }) => {
        //편지 도착버튼을 활성화하기 위해 onLetterView를 true로 전환.
        setOnLetterView(true);
        setReceivedMessage(message.content);
      });
    }

    return () => {
      socket?.off("latte");
      socket?.disconnect();
    };
  }, [socket]);

  return (
    <main className="w-[692px] h-[494px] bg-sky-200">
      <h2>Welcome to the Letter Page</h2>
      {/* 소켓으로 메세지가 도착하면 버튼이 활성화됨. 버튼을 클릭하면
      receivedLetter가 true로 전환되며 onLetterView가 다시 false로 전환된다. */}
      {onLetterView ? <ReceivedLetterButton /> : null}
      {/* ReceivedLetterButton을 클릭하면 receivedLetter가 true로 전환되며
      ReceivedLetterView가 활성화되고 receivedMessage가 내부로 전달됨. */}
      {receivedLetter ? (
        <ReceivedLetterView letterMessage={receivedMessage!} />
      ) : null}
      {/* 편지 작성 버튼 */}
      <WriteLetterButton />
      {/* 작성 버튼 클릭 시 sendLetter가 true로 전환되며 WirteLetterView활성화
      WirteLetterView내부의 보내기 버튼이나 닫기를 클릭하면 sendLetter는 다시
      false로 전환. */}
      {sendLetter ? <WirteLetterView /> : null}
    </main>
  );
};

export default View;
