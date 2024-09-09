export default interface FormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
  className?: string;
}