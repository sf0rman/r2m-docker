import { SubmitHandler, useForm } from "react-hook-form";
import TodoButton from "../button/button";
import Input from "../input/Input";
import styles from "./register.module.css";
import useApi from "../../hooks/useApi";

export interface IRegisterForm {
  username: string;
  password: string;
  repeatPassword: string;
}

interface RegisterFormProps {
  close: () => unknown;
}

export default function RegisterForm({ close }: RegisterFormProps) {
  const api = useApi();
  const { register, handleSubmit } = useForm<IRegisterForm>();

  const doRegister: SubmitHandler<IRegisterForm> = async (formData, event) => {
    console.log(event);
    event?.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      alert("Passwords don't match");
      return;
    }

    const result = await api.post("register", {
      username: formData.username,
      password: formData.password,
    });

    if (result.error) {
      alert(result.error);
      return;
    }

    alert(`User ${formData.username} registered successfully`);
    close();
  };
  return (
    <form className={styles.registerform} onSubmit={handleSubmit(doRegister)}>
      <Input label="username" {...register("username")} />
      <Input type="password" label="password" {...register("password")} />
      <Input
        type="password"
        label="repeat password"
        {...register("repeatPassword")}
      />
      <TodoButton type="submit">Register</TodoButton>
    </form>
  );
}
