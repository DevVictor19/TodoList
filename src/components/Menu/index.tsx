import { Moon, Sun } from "phosphor-react";
import { useAuth } from "../../hooks/useAuth";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import { useTheme } from "../../hooks/useTheme";
import { Profile } from "./Profile";

export function Menu() {
  const { theme, setTheme } = useTheme();
  const { currentUser } = useAuth();
  const screenWidth = useScreenWidth();

  const iconSize = screenWidth > 1024 ? 24 : 22;

  const handleChangeTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <section className="flex justify-between items-center text-white mt-12">
      <h1 className="font-bold text-[32px] lg:text-[40px] tracking-[15px]">
        TODO
      </h1>
      <div className="flex gap-4 items-center">
        {currentUser && <Profile />}
        <button
          className="flex items-center"
          onClick={handleChangeTheme}
          type="button"
        >
          {theme === "dark" ? (
            <Sun size={iconSize} weight="fill" />
          ) : (
            <Moon size={iconSize} weight="fill" />
          )}
        </button>
      </div>
    </section>
  );
}
