import { useRef, FormEvent } from "react";
import { Check } from "phosphor-react";
import { Todo } from "../../../interfaces/Todo";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { useAuth } from "../../../hooks/useAuth";

interface Props {
  onSubmit: (todo: Todo) => void;
}

export function Bar({ onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputRef.current?.value) return;

    const todoId = crypto.randomUUID();

    const newTodo: Todo = {
      name: inputRef.current.value,
      id: todoId,
      completed: false,
    };

    try {
      await setDoc(
        doc(db, "users", currentUser!.uid, "todos", todoId),
        newTodo
      );
      inputRef.current.value = "";
      onSubmit(newTodo);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="w-full mt-10 relative" onSubmit={handleSubmit}>
      <input
        className="w-full pl-[52px] pr-5 py-[18px] outline-none rounded-[5px] bg-white 
        dark:bg-[#25273D] shadow-[0px_35px_50px_-15px_#c2c3d67f] dark:shadow-[0px_35px_50px_-15px_#0000007f] 
        placeholder:text-[#9495A5] dark:placeholder:text-[#767992] text-slate-900 
        dark:text-white text-xs"
        type="text"
        ref={inputRef}
        placeholder="Create a new todo…"
      />
      <button
        className="w-5 h-5 bg-transparent absolute inset-y-0 my-auto left-5 border-[1px] rounded-full
        dark:border-[#393A4B] hover:bg-gradient-to-br hover:from-[#55DDFF] hover:to-[#C058F3]
        active:bg-gradient-to-br active:from-[#55DDFF] active:to-[#C058F3] flex justify-center
        items-center group"
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
