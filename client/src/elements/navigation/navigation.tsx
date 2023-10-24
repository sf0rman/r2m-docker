import { useCookies } from "../../provider/cookie-provider";
import TodoButton from "../button/button";
import styles from "./navigation.module.css";

interface NavigationProps {
  username: string;
}

export default function Navigation({ username }: NavigationProps) {
  const cookies = useCookies();
  return (
    <div className={styles.navigation}>
      <p>You are logged in as {username}</p>
      <TodoButton onClick={() => cookies.clearCookies()}>Logout</TodoButton>
    </div>
  );
}
