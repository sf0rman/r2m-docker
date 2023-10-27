import { MouseEventHandler, ReactElement } from "react";
import TodoButton from "../button/button";
import styles from "./dialog.module.css";

interface DialogProps {
  open: boolean;
  children: ReactElement | string;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export default function Dialog({ open, children, onClose }: DialogProps) {
  return (
    <dialog className={styles.dialog} open={open}>
      <span className={styles.between}>
        <h3>Register</h3>
        <TodoButton styling="close" onClick={onClose}>
          X
        </TodoButton>
      </span>
      {children}
    </dialog>
  );
}
