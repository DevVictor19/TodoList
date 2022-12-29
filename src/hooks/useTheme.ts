import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";
import { IThemeContext } from "../ts/interfaces/ThemeContext";

export function useTheme() {
  return useContext(ThemeContext) as IThemeContext;
}
