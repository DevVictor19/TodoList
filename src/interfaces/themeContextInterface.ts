import { Dispatch, SetStateAction } from "react";

export type Themes = "dark" | "light";

export interface ThemeContextInterface {
  theme: Themes;
  setTheme: Dispatch<SetStateAction<Themes>>;
}
