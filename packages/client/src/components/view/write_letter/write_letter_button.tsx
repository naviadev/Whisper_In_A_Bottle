import React from "react";
import { useView } from "@client/src/app/(organism)/view/context/view.context";
/**
 * * 편지 작성 버튼
 * @returns Button
 */
export const WriteLetterButton = () => {
  const { setSendLetter } = useView();

  const handleSendLetterView = () => {
    setSendLetter(true);
  };
  return (
    <div>
      <button onClick={handleSendLetterView}>빈병(편지작성)</button>
    </div>
  );
};
