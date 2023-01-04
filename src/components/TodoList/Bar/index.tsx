import { useRef, FormEvent } from "react";
import { Check } from "phosphor-react";
import { ITodo } from "../../../ts/interfaces/Todo";

interface Props {
  onAddTodo: (newTodo: ITodo) => void;
}

export function Bar({ onAddTodo }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputRef.current?.value) return;

    const newTodo: ITodo = {
      name: inputRef.current.value.trim(),
      id: crypto.randomUUID(),
      completed: false,
    };

    onAddTodo(newTodo);

    inputRef.current.value = "";
  };

  return (
    <form className="w-full mt-10 md:mt-12 relative" onSubmit={handleSubmit}>
      <input
        className="w-full pl-[52px] md:pl-[72px] pr-5 py-[18px] outline-none rounded-[5px] bg-white 
        dark:bg-[#25273D] shadow-[0px_35px_50px_-15px_#c2c3d67f] dark:shadow-[0px_35px_50px_-15px_#0000007f] 
        placeholder:text-[#9495A5] dark:placeholder:text-[#767992] text-slate-900 
        dark:text-white text-xs md:text-lg"
        type="text"
        ref={inputRef}
        placeholder="Create a new todo…"
      />
      <button
        className="w-5 h-5 md:w-6 md:h-6 bg-transparent absolute inset-y-0 my-auto left-5 md:left-6 border-[1px] 
        rounded-full dark:border-[#393A4B] hover:bg-gradient-to-br hover:from-[#55DDFF] 
        hover:to-[#C058F3]active:bg-gradient-to-br active:from-[#55DDFF] active:to-[#C058F3] 
        flex justify-centeritems-center group"
        type="submit"
      >
        <Check
          className="text-white hidden group-hover:block group-active:block"
          size={12}
          weight="bold"
        />
      </button>
    </form>
  );
}
