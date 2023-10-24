import { useEffect, useState } from "react";
import TodoItem, { TodoItemProps } from "./todo-item";
import styles from "./todo.module.css";
import TodoButton from "../button/button";
import useApi from "../../hooks/useApi";

export default function TodoWrapper() {
  const api = useApi();
  const [todos, setTodos] = useState<TodoItemProps[]>([]);

  const getTodos = async () => {
    const result = await api.get("todo");
    setTodos(result.data.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className={styles["todo-wrapper"]}>
      <TodoButton className={styles.create}>Create Todo</TodoButton>
      <div className={styles.grid}>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            title={todo.title}
            details={todo.details}
            created_at={todo.created_at}
            complete={todo.complete}
            updated_at={todo.updated_at}
          />
        ))}
      </div>
    </div>
  );
}
