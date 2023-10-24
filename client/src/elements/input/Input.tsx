import { forwardRef } from "react";
import styles from "./input.module.css";

interface TodoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default forwardRef<HTMLInputElement, TodoInputProps>(function TodoInput(
  { label, name, error, ...props }: TodoInputProps,
  ref
) {
  return (
    <span className={styles["input-container"]}>
      <label htmlFor={name}>{label}</label>
      <input
        className={styles.input}
        name={name}
        placeholder={label}
        {...props}
        ref={ref}
      />
      {error && <p className={styles.error}>{error}</p>}
    </span>
  );
});
