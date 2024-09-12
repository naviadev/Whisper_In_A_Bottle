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
      className=" bg-gray-200 bg-opacity-50 border-2 border-minimap-borderColor rounded-lg placeholder-italic placeholder-text-black placeholder-opacity-40 w-[138px] h-8 text-[8px] pl-2 text-minimap-text"
      id={id}
    />
  );
};
export default LoginInput;
