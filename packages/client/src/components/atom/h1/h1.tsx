import H1Props from "./h1Props";
const H1: React.FC<H1Props> = ({ text, className }) => {
  return <h1 className={`text-3xl font-bold ${className}`}>{text}</h1>;
};

export default H1;
