import { createContext, useState, ReactNode, useMemo } from "react";
import {
  ThemeContextInterface,
  Themes,
} from "../interfaces/themeContextInterface";

interface Props {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextInterface | null>(null);

export function ThemeContextProvider({ children }: Props) {
  const lastTheme: Themes =
    localStorage.getItem("theme") === "dark" ? "dark" : "light";

  const [theme, setTheme] = useState<Themes>(lastTheme);

  const root = window.document.documentElement;

  root.classList.remove(lastTheme);
  root.classList.add(theme);

  localStorage.setItem("theme", theme);

  const context = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
}
