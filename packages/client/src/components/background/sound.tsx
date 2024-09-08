import "./sound.css";

export const Sound: React.FC = () => {
  const elements: JSX.Element[] = [];

  // for문으로 65개의 동일한 요소를 배열에 추가
  for (let i = 0; i < 64; i++) {
    elements.push(<div key={i} className="circle rounded-full w-1 h-1" ></div>);
  }

  return <div className="sound grid grid-cols-4 gap-1">{elements}</div>;
};