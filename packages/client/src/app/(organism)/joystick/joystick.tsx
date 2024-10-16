"use client";
"use client";
import React from "react";
import { Pad } from "./component/pad";
import { SingleButton } from "./component/single_button";
import { useView } from "@client/src/app/(organism)/view/context/view_context";
import { useAll } from "../../context/all_context";


const Joystick: React.FC = () => {
  const { reqLogout} = useAll();
  const { receivedMessage, setReceivedMessage, setReceivedLetter } = useView();
  const triggerKeyPress = (key: string) => {
    const event = new KeyboardEvent("keydown", {
      key: key,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);
  };


  // 버튼 클릭 핸들러에서 사용
  const clickTopBtn = () => {
    triggerKeyPress("ArrowUp");
  };

  const clickLeftBtn = () => {
    triggerKeyPress("ArrowLeft");
  };

  const clickRightBtn = () => {
    triggerKeyPress("ArrowRight");
  };

  const clickBottomBtn = () => {
    triggerKeyPress("ArrowDown");
  };

  const clickHomeBtn = () => {
    console.log("Home Btn Click");
    reqLogout();
  };
  const clickXBtn = () => {
    console.log("X Btn Click");
  };
  const clickYBtn = () => {
    console.log("Y Btn Click");
  };
  const clickSaveBtn = () => {
    if (receivedMessage) {
      // 현재 시간을 키로 사용하여 메시지 저장
      const key = `savedMessage_${Date.now()}`;
      localStorage.setItem(key, receivedMessage);
      console.log("메시지가 저장되었습니다:", key);

      // 메시지 저장 후 편지 창 닫기
      setReceivedLetter(false);
      setReceivedMessage(null);
    } else {
      console.log("저장할 메시지가 없습니다.");
    }
  };
  const clickDelBtn = () => {
    setReceivedMessage(null);
    setReceivedLetter(false);
  };

  return (
    <div className="relative">
      <Pad
        topClick={clickTopBtn}
        leftClick={clickLeftBtn}
        rightClick={clickRightBtn}
        bottomClick={clickBottomBtn}
      ></Pad>
      <SingleButton
        src="Home-Button.svg"
        alt="Home-Button"
        left="80%"
        top="10%"
        width={30}
        height={30}
        click={clickHomeBtn}
      ></SingleButton>
      <SingleButton
        src="/X-Button.svg"
        alt="X-Button"
        left="13%"
        top="10%"
        width={43}
        height={43}
        click={clickXBtn}
      ></SingleButton>
      <SingleButton
        src="/Y-Button.svg"
        alt="Y-Button"
        left="2%"
        top="30%"
        width={43}
        height={43}
        click={clickYBtn}
      ></SingleButton>
      <SingleButton
        src="/SAVE.svg"
        alt="Save"
        left="4%"
        top="50%"
        width={46.39}
        height={45.08}
        click={clickSaveBtn}
      ></SingleButton>
      <SingleButton
        src="/DEL.svg"
        alt="Del"
        left="14%"
        top="70%"
        width={43.02}
        height={41.79}
        click={clickDelBtn}
      ></SingleButton>
    </div>
  );
};

export default Joystick;
