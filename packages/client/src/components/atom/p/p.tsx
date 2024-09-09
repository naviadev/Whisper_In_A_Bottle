import PProps from "./pProps";

const P: React.FC<PProps> = ({ text, className }) => {
  return <p className={`text-base leading-6 ${className}`}>{text}</p>;
};

export default P;
