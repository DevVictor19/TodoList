import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useMemo,
} from "react";

type Themes = "dark" | "light";

interface ThemeContextInterface {
  theme: Themes;
  setTheme: Dispatch<SetStateAction<Themes>>;
}

interface Props {
  children: ReactNode;
}

const defaultValue = {
  theme: "light" as Themes,
  setTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextInterface>(defaultValue);

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
