import React from "react";
import "../../styles/background/title.css";

type titleProps = {
  className?: string;
};

export const Title: React.FC<titleProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="flex flex-row justify-between items-center h-full">
        <div className="flex flex-col gap-2 ">
          <div className="w-[43px] border border-[#f9e05f]" />
          <div className="w-[43px] border border-[#f9e05f]" />
        </div>
        <div className="">
          <h1 className="Whisper-In-A-Bottle1 relative mx-3">
            Whisper In A Bottle
            <h1 className="Whisper-In-A-Bottle2 absolute left-0 top-0">
              Whisper In A Bottle
            </h1>
          </h1>
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="w-[43px] border border-[#f9e05f]" />
          <div className="w-[43px] border border-[#f9e05f]" />
        </div>
      </div>
    </div>
  );
};
