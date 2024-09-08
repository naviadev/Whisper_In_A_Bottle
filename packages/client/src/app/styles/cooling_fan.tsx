import "./cooling_fan.css";

export const CoolongFan: React.FC = () => {
  const elements: JSX.Element[] = [];

  // for문으로 65개의 동일한 요소를 배열에 추가
  for (let i = 0; i < 6; i++) {
    elements.push(<div key={i} className="rect w-1 h-14"></div>);
  }

  return <div className="cooling-fan flex gap-x-2">{elements}</div>;
};
