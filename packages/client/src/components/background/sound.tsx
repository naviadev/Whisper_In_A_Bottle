import React from "react";

export const Sound: React.FC = () => {
  const elements: JSX.Element[] = [];

  // for문으로 65개의 동일한 요소를 배열에 추가
  for (let i = 0; i < 64; i++) {
    elements.push(
      <div
        key={i}
        className="bg-[#A2A2A2] rounded-full w-1 h-1 ustom-inset-shadow "
      ></div>
    );
  }

  return <div className="grid grid-cols-4 gap-1 ">{elements}</div>;
};
