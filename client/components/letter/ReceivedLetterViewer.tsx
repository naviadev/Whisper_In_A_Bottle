// 도착한 편지창
import React from "react";

const ReceivedLetterViewer: React.FC<{ letterContent: string | null }> = ({
  letterContent,
}) => {
  return (
    <div>
      {letterContent ? (
        <div>{letterContent}</div>
      ) : (
        <div>도착한 편지가 없습니다</div>
      )}
    </div>
  );
};

export default ReceivedLetterViewer;
