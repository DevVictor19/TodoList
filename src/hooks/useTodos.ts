import { useState } from "react";
import { ITodo } from "../ts/interfaces/Todo";

export function useTodos() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const addTodo = (newTodo: ITodo) => {
    setTodos((todos) => todos.concat(newTodo));
  };

  const removeTodo = (id: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const toggleCompleteTodo = (id: string, currentState: boolean) => {
    setTodos((prev) =>
      prev.map((todo) => ({
        id: todo.id,
        name: todo.name,
        completed: todo.id === id ? !currentState : todo.completed,
      }))
    );
  };

  return {
    todos,
    setTodos,
    addTodo,
    removeTodo,
    toggleCompleteTodo,
  };
}
