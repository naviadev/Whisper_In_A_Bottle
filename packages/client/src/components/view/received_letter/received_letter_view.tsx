import React from "react";

type ReceivedLetterViewPropType = {
  letterMessage: string;
  className?: string;
};

/**
 * * 도착한 편지가 나타나는 뷰 컴포넌트
 * @param 소켓으로 도착한 메세지
 * @returns 
 */
export const ReceivedLetterView: React.FC<ReceivedLetterViewPropType> = ({
  letterMessage,
  className,
}) => {
  return <div className={className}>{letterMessage}</div>;
};
