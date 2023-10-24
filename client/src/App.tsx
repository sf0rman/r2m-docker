import "./App.css";
import Login from "./pages/login";
import Home from "./pages/home";
import { CookieProvider, useCookies } from "./provider/cookie-provider";

function App() {
  const cookies = useCookies();

  return <>{cookies.getCookie("demo-session-cookie") ? <Home /> : <Login />}</>;
}

export default App;
