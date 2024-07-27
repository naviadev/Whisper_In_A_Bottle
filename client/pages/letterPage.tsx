import React from "react";

import LetterHeader from "../components/letter/LetterHeader";
import LetterMain from "../components/letter/LetterMain";

const LettersPage: React.FC = () => {
  return (
    <div>
      <LetterHeader />
      <LetterMain />
    </div>
  );
};

export default LettersPage;
