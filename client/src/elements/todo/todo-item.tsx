import TodoButton from "../button/button";
import styles from "./todo.module.css";

export interface TodoItemProps {
  title: string;
  details: string;
  created_at: string;
  updated_at?: string;
  complete: boolean;
}

export default function TodoItem({
  title,
  details,
  complete,
  created_at,
  updated_at,
}: TodoItemProps) {
  return (
    <div className={styles["todo-item"]}>
      <span className={styles.title}>
        <h1>{title}</h1>
        <p>{new Date(created_at).toDateString()}</p>
      </span>
      <p>{details}</p>
      {complete ? (
        "Completed"
      ) : (
        <TodoButton className={styles.complete}>Complete</TodoButton>
      )}
    </div>
  );
}
