import { useCallback, useEffect, useState } from "react";
import { Bar } from "./Bar";
import { Filter } from "./Filter";
import { List } from "./List";
import { useAuth } from "../../hooks/useAuth";
import { Todo } from "../../interfaces/Todo";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const getTodos = async () => {
      try {
        const querySnapShot = await getDocs(
          collection(db, "users", currentUser!.uid, "todos")
        );

        const dbTodos: Todo[] = [];

        querySnapShot.forEach((doc) => {
          dbTodos.push(doc.data() as Todo);
        });

        setTodos(dbTodos);
      } catch (e) {
        console.log(e);
      }
    };

    console.log("useeffect");

    getTodos();
  }, []);

  const handleAddTodo = useCallback(
    (todo: Todo) => {
      setTodos((prev) => prev.concat(todo));
    },
    [setTodos]
  );

  const handleRemoveTodo = useCallback(
    (id: string) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
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
      <Bar onSubmit={handleAddTodo} />
      <List
        todos={todos}
        onRemove={handleRemoveTodo}
        onToggleComplete={handleToggleCompleteTodo}
      />
      <Filter />
    </>
  );
}
