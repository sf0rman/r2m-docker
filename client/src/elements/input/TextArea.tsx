import { forwardRef } from "react";
import styles from "./input.module.css";

interface TodoInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default forwardRef<HTMLTextAreaElement, TodoInputProps>(
  function TodoTextarea({ label, name, error, ...props }: TodoInputProps, ref) {
    return (
      <span className={styles["input-container"]}>
        <label htmlFor={name}>{label}</label>
        <textarea
          className={styles.textarea}
          name={name}
          placeholder={label}
          {...props}
          ref={ref}
        />
        {error && <p className={styles.error}>{error}</p>}
      </span>
    );
  }
);
