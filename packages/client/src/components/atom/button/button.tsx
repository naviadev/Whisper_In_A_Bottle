import React from "react";
import ButtonProps from "./buttonProps";

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
  type = "button",
  disabled = false,
  ariaLabel,
  icon,
  size = "medium",
  loading = false,
}) => {
  // Tailwind 크기별 클래스 정의
  const sizeClass = {
    small: "px-2 py-1 text-xs",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`${className} `}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {/* 로딩 중일 때 로딩 텍스트나 스피너 표시 */}
      {loading ? (
        <span className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-blue-500 rounded-full"></span>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
};

export default Button;
