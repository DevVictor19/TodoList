import { Todo } from "../../../../interfaces/Todo";

interface Props {
  todos: Todo[];
  onClearCompletedTodos: (
    incompleteTodos: Todo[],
    completedTodosId: string[]
  ) => void;
}

export function ListMenu({ todos, onClearCompletedTodos }: Props) {
  const incompleteItems: Todo[] = [];
  const completedTodosId: string[] = [];

  for (let todo of todos) {
    if (todo.completed) {
      completedTodosId.push(todo.id);
    } else {
      incompleteItems.push(todo);
    }
  }

  const handleClearCompleted = () => {
    onClearCompletedTodos(incompleteItems, completedTodosId);
  };

  return (
    <section
      className="flex justify-between items-center py-4 px-5 
          border-t-[0.5px] border-[#E3E4F1] dark:border-[#393A4B]
          text-[#9495A5] dark:text-[#5B5E7E] text-xs"
    >
      <h1>{incompleteItems.length} items left</h1>
      <button onClick={handleClearCompleted}>Clear Completed</button>
    </section>
  );
}
