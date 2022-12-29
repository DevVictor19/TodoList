import { useCallback, useEffect, useState } from "react";
import { Bar } from "./Bar";
import { Filter } from "./Filter";
import { List } from "./List";
import { useAuth } from "../../hooks/useAuth";
import { ITodo } from "../../ts/interfaces/Todo";
import { useFirestore } from "../../hooks/useFirestore";
import { FilterOptions } from "../../ts/types/FilterOptions";

export function TodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filter, setFilter] = useState<FilterOptions>("all");
  const { currentUser } = useAuth();
  const { getTodos, addTodo, removeTodo, toggleCompleteTodo } = useFirestore(
    currentUser!.uid
  );

  const completedTodos: ITodo[] = [];
  const incompletedTodos: ITodo[] = [];

  let listContent: ITodo[] = [];

  switch (filter) {
    case "active":
      listContent = incompletedTodos;
      break;
    case "completed":
      listContent = completedTodos;
      break;
    default:
      listContent = todos;
  }

  todos.forEach((todo) => {
    if (todo.completed) {
      completedTodos.push(todo);
    } else {
      incompletedTodos.push(todo);
    }
  });

  useEffect(() => {
    getTodos().then(setTodos).catch(console.log);
  }, []);

  const handleAddTodo = useCallback(
    (newTodo: ITodo) => {
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

  const handleClearCompletedTodos = useCallback(() => {
    let promises: Promise<void>[] = [];

    completedTodos.forEach((todo) => {
      promises.push(removeTodo(todo.id));
    });

    Promise.all(promises)
      .then(() => setTodos(incompletedTodos))
      .catch(console.log);
  }, [setTodos, removeTodo]);

  const handleSetFilter = useCallback(
    (filter: FilterOptions) => {
      setFilter(filter);
    },
    [setFilter]
  );

  return (
    <>
      <Bar onAddTodo={handleAddTodo} />
      <List
        todos={listContent}
        onRemoveTodo={handleRemoveTodo}
        onToggleCompleteTodo={handleToggleCompleteTodo}
        onClearCompletedTodos={handleClearCompletedTodos}
        incompletedTodosNumber={incompletedTodos.length}
      />
      <Filter currentFilter={filter} onSetFilter={handleSetFilter} />
    </>
  );
}
