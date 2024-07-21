import React, { useState } from "react";

// * 편지 입력창 + 버튼
const LetterComposer: React.FC = () => {
  const [content, setContent] = useState("");

  return (
    <div>
      <textarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="button">보내기</button>
    </div>
  );
};

export default LetterComposer;
