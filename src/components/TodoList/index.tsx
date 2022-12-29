import { useCallback, useEffect, useState } from "react";
import { Bar } from "./Bar";
import { Filter } from "./Filter";
import { List } from "./List";
import { useAuth } from "../../hooks/useAuth";
import { Todo } from "../../interfaces/Todo";
import { useFirestore } from "../../hooks/useFirestore";

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { currentUser } = useAuth();
  const { getTodos, addTodo, removeTodo, toggleCompleteTodo } = useFirestore(
    currentUser!.uid
  );

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
    [setTodos, removeTodo]
  );

  const handleToggleCompleteTodo = useCallback(
    (id: string, currentState: boolean) => {
      toggleCompleteTodo(id, currentState).then(() => {
        setTodos((prev) =>
          prev.map((todo) => ({
            id: todo.id,
            name: todo.name,
            completed: todo.id === id ? !currentState : todo.completed,
          }))
        );
      });
    },
    [setTodos, toggleCompleteTodo]
  );

  const handleClearCompletedTodos = useCallback(
    (incompleteTodos: Todo[], completedTodosId: string[]) => {
      let promises: Promise<void>[] = [];

      completedTodosId.forEach((id) => {
        promises.push(removeTodo(id));
      });

      Promise.all(promises)
        .then(() => setTodos(incompleteTodos))
        .catch(console.log);
    },
    [setTodos, removeTodo]
  );

  return (
    <>
      <Bar onAddTodo={handleAddTodo} />
      <List
        todos={todos}
        onRemoveTodo={handleRemoveTodo}
        onToggleCompleteTodo={handleToggleCompleteTodo}
        onClearCompletedTodos={handleClearCompletedTodos}
      />
      <Filter />
    </>
  );
}
