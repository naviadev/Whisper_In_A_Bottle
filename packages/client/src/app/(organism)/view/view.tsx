"use client";
import React, { useState, useEffect } from "react";
import { useView } from "./context/view_context";
import { useSocket } from "../../context/socket_context";
import { WriteLetterButton } from "@client/src/components/view/write_letter/write_letter_button";
import { WirteLetterView } from "@client/src/components/view/write_letter/write_letter_view";
import { ReceivedLetterButton } from "@client/src/components/view/received_letter/received_letter_button";
import { ReceivedLetterView } from "@client/src/components/view/received_letter/received_letter_view";
import { useAll } from "../../context/all_context";
import { CanvasComponent } from "@client/src/components/view/canvas";

const View: React.FC = () => {
  const socket = useSocket();
  const { onLetterView, setOnLetterView, receivedLetter, sendLetter } =
    useView();

  const [receivedMessage, setReceivedMessage] = useState<string | null>(null);

  const { getToken } = useAll();

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
  }, [socket, setOnLetterView]);

  return (
    <main className="h-full w-full">
      <CanvasComponent />
    </main>
  );
};

export default View;
