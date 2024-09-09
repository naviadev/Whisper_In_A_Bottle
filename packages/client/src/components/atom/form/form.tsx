import FormProps from "./form.props";
const Form: React.FC<FormProps> = ({ onSubmit, children, className }) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`}>
      {children}
    </form>
  );
};

export default Form;
