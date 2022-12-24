import { Moon, Sun } from "phosphor-react";
import { useTheme } from "../../hooks/useTheme";

export function Menu() {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <section className="flex justify-between items-center text-white mt-12">
      <h1 className="font-bold text-[32px] tracking-[15px]">TODO</h1>
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
    </section>
  );
}
