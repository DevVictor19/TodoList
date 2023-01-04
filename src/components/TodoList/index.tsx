import { useCallback, useEffect, useState } from "react";
import { useFirestoreTodos } from "../../hooks/useFirestoreTodos";
import { useTodos } from "../../hooks/useTodos";
import { toast } from "react-toastify";
import { Bar } from "./Bar";
import { Filter } from "./Filter";
import { List } from "./List";
import { ITodo } from "../../ts/interfaces/Todo";
import { FilterOptions } from "../../ts/types/FilterOptions";

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
        toast.error("Ops, something went wrong...");
      });
  }, []);

  const handleAddTodo = useCallback(
    (newTodo: ITodo) => {
      addFirestoreTodo(newTodo)
        .then(() => {
          addLocalTodo(newTodo);

          toast.success("New todo added");
        })
        .catch((e) => {
          console.log(e);
          toast.error("Ops, something went wrong...");
        });
    },
    [addFirestoreTodo, addLocalTodo]
  );

  const handleRemoveTodo = useCallback(
    (id: string) => {
      removeFirestoreTodo(id)
        .then(() => {
          removeLocalTodo(id);
          toast.warn("Todo removed");
        })
        .catch((e) => {
          console.log(e);
          toast.error("Ops, something went wrong...");
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

          toggleCompleteLocalTodo(id, currentState);
          toast.info(toastMessage);
        })
        .catch((e) => {
          console.log(e);
          toast.error("Ops, something went wrong...");
        });
    },
    [toggleCompleteFirestoreTodo, toggleCompleteLocalTodo]
  );

  const handleClearCompletedTodos = useCallback(() => {
    if (completedTodos.length === 0) {
      toast.warn("Have no todos to be cleared...", { autoClose: 3000 });
      return;
    }

    const promises: Promise<void>[] = [];

    completedTodos.forEach((todo) => {
      promises.push(removeFirestoreTodo(todo.id));
    });

    Promise.all(promises)
      .then(() => {
        toast.info("Completed todos cleared");
        setLocalTodos(incompletedTodos);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Ops, something went wrong...");
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
