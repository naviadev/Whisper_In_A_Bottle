type ButtonType = 'button' | 'submit' | 'reset';
type ButtonSize = 'small' | 'medium' | 'large';

export default interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: ButtonType;
  disabled?: boolean;
  ariaLabel?: string;
  icon?: React.ReactNode;
  size?: ButtonSize;
  loading?: boolean;
}