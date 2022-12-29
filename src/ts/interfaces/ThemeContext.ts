import { Dispatch, SetStateAction } from "react";
import { Themes } from "../types/Themes";

export interface IThemeContext {
  theme: Themes;
  setTheme: Dispatch<SetStateAction<Themes>>;
}
