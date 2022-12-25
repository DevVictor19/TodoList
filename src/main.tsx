import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeContextProvider } from "./contexts/themeContext";
import { App } from "./App";
import "./index.css";
import { AuthContextProvider } from "./contexts/authContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
