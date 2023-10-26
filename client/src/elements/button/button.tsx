import { ReactElement } from "react";
import styles from "./button.module.css";

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
    <button className={styles.button} type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
