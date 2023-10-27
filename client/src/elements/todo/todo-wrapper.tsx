import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import TodoButton from "../button/button";
import Dialog from "../dialog/dialog";
import CreateTodo from "./create-todo";
import TodoItem, { TodoItemProps } from "./todo-item";
import styles from "./todo.module.css";

export default function TodoWrapper() {
  const api = useApi();
  const [todos, setTodos] = useState<TodoItemProps[]>([]);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const result = await api.get("todo");
    setTodos(result.data.data);
  };

  const createTodo = () => {
    setCreate(true);
  };

  const completeCreate = () => {
    setCreate(false);
    getTodos();
  };

  return (
    <>
      {create && (
        <Dialog title="Create Todo" onClose={() => setCreate(false)}>
          <CreateTodo done={completeCreate} />
        </Dialog>
      )}
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
    </>
  );
}
