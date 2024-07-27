import { useState } from "react";

type ContainerState = "PostLetter" | "LetterList";

const useLetteContainerHooks = () => {
  const [isLetterContainerContentMode, isSetLetterContainerContentMode] =
    useState<ContainerState>("PostLetter");

  return {
    isLetterContainerContentMode,
    isSetLetterContainerContentMode,
  };
};

export default useLetteContainerHooks;
