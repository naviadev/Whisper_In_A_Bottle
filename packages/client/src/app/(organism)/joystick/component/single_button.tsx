import Image from "next/image";

interface ButtonProps {
    src: string
    alt: string
    left: string
    top: string,
    width: number,
    height: number,
    click?: React.MouseEventHandler<HTMLInputElement>
}

export const SingleButton: React.FC<ButtonProps> = ({ src, alt, left, top, width, height, click }) => {
  return (
    <div style={{left, top} }className="absolute" onClick={click}>
      <Image src={src} alt={alt} width={width} height={height}></Image>
    </div>
  );
};
