import SocketProvider from "../components/letter/letter_provider";
import LetterHeader from "../components/letter/letter_header";
import LetterMain from "../components/letter/letter_main";

const LettersPage: React.FC = () => {
  return (
    <>
      <SocketProvider>
        <LetterHeader />
        <LetterMain />
      </SocketProvider>
    </>
  );
};

export default LettersPage;
