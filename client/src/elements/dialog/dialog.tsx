import { MouseEventHandler, ReactElement, useEffect, useRef } from "react";
import TodoButton from "../button/button";
import styles from "./dialog.module.css";

interface DialogProps {
  title: string;
  children: ReactElement | string;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export default function Dialog({ title, children, onClose }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
    return () => dialogRef.current?.close();
  }, []);

  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <span className={styles.between}>
        <h3>{title}</h3>
        <TodoButton styling="close" onClick={onClose}>
          X
        </TodoButton>
      </span>
      {children}
    </dialog>
  );
}
