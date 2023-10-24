import { useForm } from "react-hook-form";
import TodoButton from "../elements/button/button";
import TodoInput from "../elements/input/Input";
import useApi from "../hooks/useApi";
import styles from "./login.module.css";
import { useCookies } from "../provider/cookie-provider";

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const api = useApi();
  const cookie = useCookies();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const doLogin = async (data: LoginForm) => {
    const result = await api.post("login", data);

    if (result.error) {
      alert(result.error);
    }

    cookie.reloadCookies();
  };

  return (
    <form
      className={styles["login-container"]}
      onSubmit={handleSubmit(doLogin)}
    >
      <TodoInput label="username" {...register("username")} />
      <TodoInput label="password" type="password" {...register("password")} />
      <TodoButton type="submit">Login</TodoButton>
    </form>
  );
}
