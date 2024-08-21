// 편지 보여질 창
import React, { useState } from "react";

import LetterComposer from "../components/letter/letter_composer";
import ReceivedLettersButton from "../components/letter/received_letters_button";
import ReceivedLetterViewer from "../components/letter/received_letter_viewer";

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
