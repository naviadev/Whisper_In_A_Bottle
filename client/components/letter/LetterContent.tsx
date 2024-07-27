import React from "react";

interface InnerContentInterface {
  letterHeader: string;
  className?: string;
}

const LetterListInnerContent: React.FC<InnerContentInterface> = ({
  letterHeader,
  className,
}) => {
  return <div className={className}>{letterHeader}</div>;
};

export default LetterListInnerContent;
