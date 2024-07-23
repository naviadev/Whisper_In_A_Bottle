import React from "react";

import * as styles from "../../../style/letterMain.css";

const LetterMain: React.FC = () => {
  return (
    <main className={styles.container}>
      <textarea className={styles.textarea} placeholder="내용을 입력하세요" />
      <div>
        <button className={styles.button} type="button">
          보내기
        </button>
        <button className={styles.button} type="button">
          수신 확인
        </button>
      </div>
    </main>
  );
};

export default LetterMain;
