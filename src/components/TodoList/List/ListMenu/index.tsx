interface Props {
  incompletedTodosNumber: number;
  onClearCompletedTodos: () => void;
}

export function ListMenu({
  incompletedTodosNumber,
  onClearCompletedTodos,
}: Props) {
  const handleClearCompleted = () => {
    onClearCompletedTodos();
  };

  return (
    <section
      className="flex justify-between items-center py-4 px-5 
          border-t-[0.5px] border-[#E3E4F1] dark:border-[#393A4B]
          text-[#9495A5] dark:text-[#5B5E7E] text-xs"
    >
      <h1>{incompletedTodosNumber} items left</h1>
      <button onClick={handleClearCompleted}>Clear Completed</button>
    </section>
  );
}
