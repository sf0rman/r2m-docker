import { useEffect, useRef, useState } from "react";
import TodoItem, { TodoItemProps } from "./todo-item";
import styles from "./todo.module.css";
import TodoButton from "../button/button";
import useApi from "../../hooks/useApi";

export default function TodoWrapper() {
  const api = useApi();
  const [todos, setTodos] = useState<TodoItemProps[]>([]);
  const [create, setCreate] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const result = await api.get("todo");
    setTodos(result.data.data);
  };

  const createTodo = () => {
    console.log("it works", dialogRef.current);
    setCreate(true);
    dialogRef.current?.showModal();
  };

  return (
    <div className={styles["todo-wrapper"]}>
      <span className={styles.right}>
        <TodoButton onClick={createTodo}>Create Todo</TodoButton>
      </span>
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
