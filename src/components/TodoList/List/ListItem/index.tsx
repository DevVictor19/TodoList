import { Check, X } from "phosphor-react";
import { Todo } from "../../../../interfaces/Todo";

const buttonActiveStyles = "bg-gradient-to-br from-[#55DDFF] to-[#C058F3]";

interface Props extends Todo {
  onRemoveTodo: (id: string) => void;
  onToggleCompleteTodo: (id: string, currentState: boolean) => void;
}

export function ListItem({
  name,
  completed,
  id,
  onRemoveTodo,
  onToggleCompleteTodo,
}: Props) {
  const handleComplete = () => {
    onToggleCompleteTodo(id, completed);
  };

  const handleRemove = () => {
    onRemoveTodo(id);
  };

  return (
    <li
      className="flex items-center px-5 py-4 first:border-none border-t-[0.5px] 
    border-[#E3E4F1] dark:border-[#393A4B]"
    >
      <button
        className={`w-5 h-5 bg-transparent border-[1px] rounded-full
        dark:border-[#393A4B] flex justify-center items-center ${
          completed && buttonActiveStyles
        }`}
        type="submit"
        onClick={handleComplete}
      >
        <Check
          className={`text-white  ${completed ? "block" : "hidden"}`}
          size={12}
          weight="bold"
        />
      </button>
      <p
        className={`ml-3 text-xs ${completed && "line-through"} ${
          completed
            ? "text-[#D1D2DA] dark:text-[#4D5067]"
            : "text-[#494C6B] dark:text-[#C8CBE7]"
        }`}
      >
        {name}
      </p>
      <button className="ml-auto text-[#494C6B]" onClick={handleRemove}>
        <X size={22} weight="light" />
      </button>
    </li>
  );
}
