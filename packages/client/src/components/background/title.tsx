import React from "react";
import "../../styles/background/title.css";

export const Title: React.FC = () => {
  return (
    <div className="h-full w-fit">
      <div className="flex flex-row justify-between items-center h-full">
        <div className="flex flex-col gap-2 ">
          <div className="w-[43px] border border-title-yellow" />
          <div className="w-[43px] border border-title-yellow" />
        </div>
        <div className="">
          <h1 className="Whisper-In-A-Bottle1 text-title-text relative mx-3">
            Whisper In A Bottle
            <h1 className="Whisper-In-A-Bottle2 text-title-yellow absolute left-0 top-0">
              Whisper In A Bottle
            </h1>
          </h1>
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="w-[43px] border border-title-yellow" />
          <div className="w-[43px] border border-title-yellow" />
        </div>
      </div>
    </div>
  );
};
