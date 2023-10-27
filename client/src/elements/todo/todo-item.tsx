import TodoButton from "../button/button";
import styles from "./todo.module.css";

export interface TodoItemProps {
  _id?: string;
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
}: TodoItemProps) {
  return (
    <div className={styles["todo-item"]}>
      <span className={styles.title}>
        <h1>{title}</h1>
        <p>{new Date(created_at).toDateString()}</p>
      </span>
      <p>{details}</p>
      <span className={styles.right}>
        {complete ? "Completed" : <TodoButton>Complete</TodoButton>}
      </span>
    </div>
  );
}
