import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Bar } from "./Bar";
import { Filter } from "./Filter";
import { List } from "./List";
import { ITodo } from "../../ts/interfaces/Todo";
import { useFirestoreTodos } from "../../hooks/useFirestoreTodos";
import { FilterOptions } from "../../ts/types/FilterOptions";
import { useTodos } from "../../hooks/useTodos";
import { useTheme } from "../../hooks/useTheme";

export function TodoList() {
  const { theme } = useTheme();

  const toastConfig = {
    autoClose: 3000,
    theme: theme,
  };

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
    getFirestoreTodos()
      .then((data) => {
        const todos: ITodo[] = [];

        data.forEach((doc) => {
          todos.push(doc.data() as ITodo);
        });

        return todos;
      })
      .then(setLocalTodos)
      .catch((e) => {
        console.log(e);
        toast.error("Ops, something went wrong...", toastConfig);
      });
  }, []);

  const handleAddTodo = useCallback(
    (newTodo: ITodo) => {
      addFirestoreTodo(newTodo)
        .then(() => {
          addLocalTodo(newTodo);
          toast.success("New todo added!", toastConfig);
        })
        .catch((e) => {
          console.log(e);
          toast.error("Ops, something went wrong...", toastConfig);
        });
    },
    [addFirestoreTodo, addLocalTodo]
  );

  const handleRemoveTodo = useCallback(
    (id: string) => {
      removeFirestoreTodo(id)
        .then(() => {
          removeLocalTodo(id);
          toast.warn("Todo removed!", toastConfig);
        })
        .catch((e) => {
          console.log(e);
          toast.error("Ops, something went wrong...", toastConfig);
        });
    },
    [removeFirestoreTodo, removeLocalTodo]
  );

  const handleToggleCompleteTodo = useCallback(
    (id: string, currentState: boolean) => {
      toggleCompleteFirestoreTodo(id, currentState)
        .then(() => {
          const toastMessage = currentState
            ? "Todo marked as uncompleted"
            : "Todo marked as completed";

          toast.info(toastMessage, toastConfig);
          toggleCompleteLocalTodo(id, currentState);
        })
        .catch((e) => {
          console.log(e);
          toast.error("Ops, something went wrong...", toastConfig);
        });
    },
    [toggleCompleteFirestoreTodo, toggleCompleteLocalTodo]
  );

  const handleClearCompletedTodos = useCallback(() => {
    const promises: Promise<void>[] = [];

    completedTodos.forEach((todo) => {
      promises.push(removeFirestoreTodo(todo.id));
    });

    Promise.all(promises)
      .then(() => {
        toast.warning("Completed todos cleared", toastConfig);
        setLocalTodos(incompletedTodos);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Ops, something went wrong...", toastConfig);
      });
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
