import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import TodoButton from "../button/button";
import Input from "../input/Input";
import TextArea from "../input/TextArea";
import styles from "./todo.module.css";

interface CreateTodoForm {
  title: string;
  details: string;
}

interface CreateTodoProps {
  done: () => unknown;
}

export default function CreateTodo({ done }: CreateTodoProps) {
  const api = useApi();
  const { register, handleSubmit } = useForm<CreateTodoForm>();

  const submitForm = async (formData: CreateTodoForm) => {
    const result = await api.post("todo", formData);
    if (result.error) {
      alert(result.error);
      return;
    } else {
      done();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
      <Input label="title" {...register("title")} />
      <TextArea label="details" {...register("details")} />
      <TodoButton type="submit" styling="secondary">
        Save
      </TodoButton>
    </form>
  );
}
