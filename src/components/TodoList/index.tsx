import { useCallback, useEffect, useState } from "react";
import { Bar } from "./Bar";
import { Filter } from "./Filter";
import { List } from "./List";
import { ITodo } from "../../ts/interfaces/Todo";
import { useFirestoreTodos } from "../../hooks/useFirestoreTodos";
import { FilterOptions } from "../../ts/types/FilterOptions";
import { useTodos } from "../../hooks/useTodos";

export function TodoList() {
  const {
    todos: localTodos,
    setTodos: setLocalTodos,
    addTodo: addLocalTodo,
    removeTodo: removeLocalTodo,
    toggleCompleteTodo: toggleCompleteLocalTodo,
  } = useTodos();

  const {
    getTodos: getFirestoreTodos,
    addTodo: addFirestoreTodo,
    removeTodo: removeFirestoreTodo,
    toggleCompleteTodo: toggleCompleteFirestoreTodo,
  } = useFirestoreTodos();

  const [filter, setFilter] = useState<FilterOptions>("all");

  const completedTodos: ITodo[] = [];
  const incompletedTodos: ITodo[] = [];

  localTodos.forEach((todo) => {
    if (todo.completed) {
      completedTodos.push(todo);
    } else {
      incompletedTodos.push(todo);
    }
  });

  let listContent: ITodo[] = [];

  switch (filter) {
    case "active":
      listContent = incompletedTodos;
      break;
    case "completed":
      listContent = completedTodos;
      break;
    default:
      listContent = localTodos;
  }

  useEffect(() => {
    getFirestoreTodos().then(setLocalTodos).catch(console.log);
  }, []);

  const handleAddTodo = useCallback(
    (newTodo: ITodo) => {
      addFirestoreTodo(newTodo)
        .then(() => addLocalTodo(newTodo))
        .catch(console.log);
    },
    [addFirestoreTodo, addLocalTodo]
  );

  const handleRemoveTodo = useCallback(
    (id: string) => {
      removeFirestoreTodo(id)
        .then(() => removeLocalTodo(id))
        .catch(console.log);
    },
    [removeFirestoreTodo, removeLocalTodo]
  );

  const handleToggleCompleteTodo = useCallback(
    (id: string, currentState: boolean) => {
      toggleCompleteFirestoreTodo(id, currentState)
        .then(() => toggleCompleteLocalTodo(id, currentState))
        .catch(console.log);
    },
    [toggleCompleteFirestoreTodo, toggleCompleteLocalTodo]
  );

  const handleClearCompletedTodos = useCallback(() => {
    const promises: Promise<void>[] = [];

    completedTodos.forEach((todo) => {
      promises.push(removeFirestoreTodo(todo.id));
    });

    Promise.all(promises)
      .then(() => setLocalTodos(incompletedTodos))
      .catch(console.log);
  }, [removeFirestoreTodo, setLocalTodos]);

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
