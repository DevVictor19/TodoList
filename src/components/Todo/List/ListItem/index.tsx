import { Check, X } from "phosphor-react";
import { useAuth } from "../../../../hooks/useAuth";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { Task } from "../../../../interfaces/Task";
import { db } from "../../../../firebase.config";

const buttonActiveStyles = "bg-gradient-to-br from-[#55DDFF] to-[#C058F3]";

interface Props extends Task {
  onRemove: (id: string) => void;
  onToggleComplete: (id: string, newState: boolean) => void;
}

export function ListItem({
  name,
  completed,
  id,
  onRemove,
  onToggleComplete,
}: Props) {
  const { currentUser } = useAuth();

  const handleComplete = async (id: string) => {
    const newState = !completed;

    try {
      await updateDoc(doc(db, "users", currentUser!.uid, "tasks", id), {
        completed: newState,
      });
      onToggleComplete(id, newState);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await deleteDoc(doc(db, "users", currentUser!.uid, "tasks", id));
      onRemove(id);
    } catch (e) {
      console.log(e);
    }
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
        onClick={(_) => handleComplete(id)}
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
      <button
        className="ml-auto text-[#494C6B]"
        onClick={(_) => handleRemove(id)}
      >
        <X size={22} weight="light" />
      </button>
    </li>
  );
}
