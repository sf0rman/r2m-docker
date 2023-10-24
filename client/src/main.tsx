import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CookieProvider } from "./provider/cookie-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookieProvider>
      <App />
    </CookieProvider>
  </React.StrictMode>
);
