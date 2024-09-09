import Input from "../atom/input/input";
import InputProps from "../atom/input/inputProps";
interface LoginInputProps extends InputProps {
  changeEvent: React.Dispatch<React.SetStateAction<string>>;
}

const LoginInput: React.FC<LoginInputProps> = ({
  value,
  changeEvent,
  type,
  placeholder,
  id,
}) => {
  return (
    <Input
      type={type}
      value={value}
      onChange={(e) => changeEvent(e.target.value)}
      placeholder={placeholder}
      className=" bg-gray-200 bg-opacity-50 border-2 border-black rounded-lg placeholder-italic placeholder-text-black placeholder-opacity-40 w-5/6 h-8 text-[10px] pl-2"
      id={id}
    />
  );
};
export default LoginInput;
