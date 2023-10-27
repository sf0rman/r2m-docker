import { ReactElement } from "react";
import styles from "./button.module.css";

interface TodoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactElement | string;
  styling?: "primary" | "secondary" | "close";
}

export default function TodoButton({
  children,
  type = "button",
  onClick,
  styling,
  ...props
}: TodoButtonProps) {
  return (
    <button
      className={`${styles.button} ${styling === "close" ? styles.red : ""}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
