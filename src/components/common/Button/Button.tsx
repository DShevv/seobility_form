interface IButtonProps {
  classname?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

function Button({ classname, disabled, children }: IButtonProps) {
  return (
    <button className={classname} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
