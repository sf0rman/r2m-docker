import { useState } from "react";
import { useForm } from "react-hook-form";
import TodoButton from "../elements/button/button";
import TodoInput from "../elements/input/Input";
import RegisterForm from "../elements/register/RegisterForm";
import useApi from "../hooks/useApi";
import { useCookies } from "../provider/cookie-provider";
import styles from "./login.module.css";

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const api = useApi();
  const cookie = useCookies();
  const { register, handleSubmit } = useForm<LoginForm>();

  const [openRegister, setOpenRegister] = useState<boolean>(false);

  const doLogin = async (data: LoginForm) => {
    const result = await api.post("login", data);

    if (result.error) {
      alert(result.error);
    }

    cookie.reloadCookies();
  };

  return (
    <>
      {openRegister ? (
        <span className={styles.register}>
          <h3>Register</h3>
          <RegisterForm close={() => setOpenRegister(false)} />
          <TodoButton styling="close" onClick={() => setOpenRegister(false)}>
            Cancel
          </TodoButton>
        </span>
      ) : (
        <form
          className={styles["login-container"]}
          onSubmit={handleSubmit(doLogin)}
        >
          <h3>Login</h3>
          <TodoInput label="username" {...register("username")} />
          <TodoInput
            label="password"
            type="password"
            {...register("password")}
          />
          <TodoButton type="submit">Login</TodoButton>
          <TodoButton type="button" onClick={() => setOpenRegister(true)}>
            Register
          </TodoButton>
        </form>
      )}
    </>
  );
}
