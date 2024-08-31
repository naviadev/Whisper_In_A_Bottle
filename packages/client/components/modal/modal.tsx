import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackDropClick = (event: React.MouseEvent) => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]"
      onClick={handleBackDropClick}
    >
      {children}
      <button onClick={onClose}>X</button>
    </div>
  );
};
export default Modal;
