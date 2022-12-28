import { Dispatch, SetStateAction } from "react";

export type Themes = "dark" | "light";

export interface IThemeContext {
  theme: Themes;
  setTheme: Dispatch<SetStateAction<Themes>>;
}
