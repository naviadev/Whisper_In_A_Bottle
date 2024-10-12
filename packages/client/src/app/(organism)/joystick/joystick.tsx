"use client";
import React from "react";
import { Pad } from "./component/pad";
import { SingleButton } from "./component/single_button";

const Joystick: React.FC = () => {
  const clickTopBtn = () => {
    console.log("Top Btn Click");
  };

  const clickLeftBtn = () => {
    console.log("Left Btn Click");
  };

  const clickRightBtn = () => {
    console.log("Right Btn Click");
  };

  const clickBottomBtn = () => {
    console.log("Bottom Btn Click");
  };

  const clickHomeBtn = () => {
    console.log("Home Btn Click");
  };
  const clickXBtn = () => {
    console.log("X Btn Click");
  };
  const clickYBtn = () => {
    console.log("Y Btn Click");
  };
  const clickSaveBtn = () => {
    console.log("Save Btn Click");
  };
  const clickDelBtn = () => {
    console.log("Del Btn Click");
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
