import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001", {
  withCredentials: true, // 자격 증명을 함께 보냄
}); // 서버 URL과 포트

const App = () => {
  const [letter, setletter] = useState(""); //입력된 문자
  const [letters, setletters] = useState<string[]>([]); //입력된 문자의 배열

  useEffect(() => {
    //마운트시 이벤트 발생 처리
    socket.on("send-letter", (letter: string) => {
      setletters((prevLetters) => [...prevLetters, letter]);
    });

    //언마운트시 이벤트 리스너 제거
    return () => {
      socket.off("send-letter");
    };
  }, []);

  //send버튼 클릭 시 데이터 보내고 필드 비우기
  const sendletter = () => {
    socket.emit("send-letter", letter);
    setletter("");
  };

  return (
    <div>
      <h1>Chat</h1>
      <label htmlFor="letterInput">Enter your message:</label>
      <input
        type="text"
        value={letter}
        onChange={(e) => setletter(e.target.value)}
        placeholder="Type your message here"
      />
      <button onClick={sendletter}>Send</button>
      <div>
        {letters.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
