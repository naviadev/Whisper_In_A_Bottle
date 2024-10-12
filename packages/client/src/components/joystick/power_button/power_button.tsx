"use client";
//전원버튼 = 로그아웃
type PowerButtonPropsType = {
  onClick: () => void;
};

//파워버튼 컴포넌트
export const PowerButton: React.FC<PowerButtonPropsType> = ({ onClick }) => {
  return (
    <>
      <div onClick={onClick} />
    </>
  );
};
