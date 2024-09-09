import InputProps from "./inputProps";
const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  className,
  disabled = false,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className} ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
    />
  );
};

export default Input;
