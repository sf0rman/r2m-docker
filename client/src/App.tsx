import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import { useCookies } from "./provider/cookie-provider";

function App() {
  const cookies = useCookies();

  return <>{cookies.getCookie("demo-session-cookie") ? <Home /> : <Login />}</>;
}

export default App;
