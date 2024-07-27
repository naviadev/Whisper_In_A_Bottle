// 편지 보여질 창
import React, { useState } from "react";

import LetterComposer from "../components/letter/LetterComposer";
import ReceivedLettersButton from "../components/letter/ReceivedLettersButton";
import ReceivedLetterViewer from "../components/letter/ReceivedLetterViewer";

const LettersPage: React.FC = () => {
  const [letterContent, setLetterContent] = useState<string | null>(null);

  return (
    <div>
      <LetterComposer />
      <ReceivedLettersButton />
      <ReceivedLetterViewer letterContent={letterContent} />
    </div>
  );
};

export default LettersPage;
