import React from "react";

import useLetteContainerHooks from "@client/viewmodels/letter/letterMainViewModel";

import * as styles from "../../style/letterMain.css";

import LetterListInnerContent from "./LetterContent";
useLetteContainerHooks;
/**
 * @ReactComponent : LetterMain
 * 작성자 : @naviadev / 2024-07-23
 * 편집자 : @naviadev / 2024-07-23
 * Issue : WIB-36
 * @return : React.FC
 * @description : Letter 화면에서 출력되는 content 영역. 임시 테스트 컴포넌트로,
 *  ThreeJs를 사용하기 전 까지 기능 테스트를 위한 Component
 */

const LetterMain: React.FC = () => {
  const { isLetterContainerContentMode, isSetLetterContainerContentMode } =
    useLetteContainerHooks();

  return (
    <main className={styles.container}>
      <div className={styles.contentContainer}>
        {isLetterContainerContentMode === "PostLetter" ? (
          <textarea
            className={styles.textarea}
            placeholder="내용을 입력하세요"
          />
        ) : (
          <LetterListInnerContent
            className={styles.Content}
            letterHeader="20nn / nn / nn - 제목 : '야호' "
          />
        )}
      </div>

      <div>
        <button className={styles.button} type="button">
          보내기
        </button>

        <button
          className={styles.button}
          type="button"
          onClick={() => {
            isLetterContainerContentMode === "PostLetter"
              ? isSetLetterContainerContentMode("LetterList")
              : isSetLetterContainerContentMode("PostLetter");
          }}
        >
          수신 확인
        </button>
        <div>수신된 편지 : 1</div>
      </div>
    </main>
  );
};

export default LetterMain;
