import { Moon, Sun } from "phosphor-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { IAuthContext } from "../../interfaces/AuthContext";
import { IThemeContext } from "../../interfaces/ThemeContext";
import { Profile } from "./Profile";

export function Menu() {
  const { theme, setTheme } = useTheme() as IThemeContext;
  const { currentUser } = useAuth() as IAuthContext;

  const handleChangeTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <section className="flex justify-between items-center text-white mt-12">
      <h1 className="font-bold text-[32px] tracking-[15px]">TODO</h1>
      <div className="flex gap-4 items-center">
        {currentUser && <Profile />}
        <button
          className="flex items-center"
          onClick={handleChangeTheme}
          type="button"
        >
          {theme === "dark" ? (
            <Sun size={22} weight="fill" />
          ) : (
            <Moon size={22} weight="fill" />
          )}
        </button>
      </div>
    </section>
  );
}
