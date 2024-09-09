export const CoolongFan: React.FC = () => {
  const elements: JSX.Element[] = [];

  // for문으로 65개의 동일한 요소를 배열에 추가
  for (let i = 0; i < 6; i++) {
    elements.push(
      <div key={i} className="bg-[#6c6c6c] shadow-inner w-1 h-14"></div>
    );
  }

  return <div className="flex gap-x-2 -mt-6 rotate-[-25deg]">{elements}</div>;
};
