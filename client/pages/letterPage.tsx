import React from "react";

import SocketProvider from "../components/letter/LetterProvider";
import LetterHeader from "../components/letter/LetterHeader";
import LetterMain from "../components/letter/LetterMain";

const LettersPage: React.FC = () => {
  return (
    <SocketProvider>
      <LetterHeader />
      <LetterMain />
    </SocketProvider>
  );
};

export default LettersPage;
