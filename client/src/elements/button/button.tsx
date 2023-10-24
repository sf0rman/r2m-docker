import { ReactElement } from "react";

interface TodoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactElement | string;
}

export default function TodoButton({
  children,
  type = "button",
  onClick,
  ...props
}: TodoButtonProps) {
  return (
    <button type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
