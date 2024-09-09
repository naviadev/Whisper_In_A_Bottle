import Input from "../atom/input/input";
import InputProps from "../atom/input/inputProps";
import Label from "../atom/label/label";
import LabelProps from "../atom/label/labelProps";

interface InputFormProps extends InputProps, LabelProps {}

const LabelInput: React.FC<InputFormProps> = ({
  id,
  text,
  value,
  onChange,
  type,
  placeholder,
}) => {
  return (
    <>
      <Label htmlFor={id} text={text} />
      <Input
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};
export default LabelInput;
