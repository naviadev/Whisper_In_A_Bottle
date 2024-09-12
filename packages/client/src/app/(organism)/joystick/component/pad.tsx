import Image from "next/image"

interface PadProps {
  topClick: React.MouseEventHandler<HTMLDivElement>
  leftClick: React.MouseEventHandler<HTMLDivElement>
  rightClick: React.MouseEventHandler<HTMLDivElement>
  bottomClick: React.MouseEventHandler<HTMLDivElement> 
}

export const Pad: React.FC<PadProps> = ({topClick, leftClick, rightClick, bottomClick}) => {
  return (
    <div className="absolute left-[30%] top-[20%]">
      <Image src="/D-pad.svg" alt="D-Pad" width={140} height={140}></Image>
      <div className="absolute left-1/2 top-1/4 w-[40px] h-[40px] -translate-x-1/2 -translate-y-1/2" onClick={topClick}></div>
      <div className="absolute left-1/4 top-1/2 w-[40px] h-[40px] -translate-x-1/2 -translate-y-1/2" onClick={leftClick}></div>
      <div className="absolute left-3/4 top-1/2 w-[40px] h-[40px] -translate-x-1/2 -translate-y-1/2" onClick={rightClick}></div>
      <div className="absolute left-1/2 top-3/4 w-[40px] h-[40px] -translate-x-1/2 -translate-y-1/2" onClick={bottomClick}></div>
    </div>
  );
};
