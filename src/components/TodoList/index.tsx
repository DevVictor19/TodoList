import { useCallback, useEffect, useState } from "react";
import { Bar } from "./Bar";
import { Filter } from "./Filter";
import { List } from "./List";
import { useAuth } from "../../hooks/useAuth";
import { Todo } from "../../interfaces/Todo";
import { useTodo } from "../../hooks/useTodo";

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { currentUser } = useAuth();
  const { getTodos, addTodo, removeTodo } = useTodo(currentUser!.uid);

  useEffect(() => {
    getTodos().then(setTodos).catch(console.log);
  }, []);

  const handleAddTodo = useCallback(
    (newTodo: Todo) => {
      addTodo(newTodo)
        .then(() => setTodos((prev) => prev.concat(newTodo)))
        .catch(console.log);
    },
    [addTodo, setTodos]
  );

  const handleRemoveTodo = useCallback(
    (id: string) => {
      removeTodo(id)
        .then(() => setTodos((prev) => prev.filter((todo) => todo.id !== id)))
        .catch(console.log);
    },
    [setTodos]
  );

  const handleToggleCompleteTodo = useCallback(
    (id: string, newState: boolean) => {
      setTodos((prev) =>
        prev.map((todo) => ({
          id: todo.id,
          name: todo.name,
          completed: todo.id === id ? newState : todo.completed,
        }))
      );
    },
    [setTodos]
  );

  return (
    <>
      <Bar onAddTodo={handleAddTodo} />
      <List
        todos={todos}
        onRemoveTodo={handleRemoveTodo}
        onToggleComplete={handleToggleCompleteTodo}
      />
      <Filter />
    </>
  );
}
