import PProps from "./pProps";

const P: React.FC<PProps> = ({ text, className }) => {
  return <p className={className}>{text}</p>;
};

export default P;
