import { useAuth } from "./hooks/useAuth";
import { Outlet } from "react-router-dom";
import { TodoList } from "./components/TodoList";

export function PrivateRoutes() {
  const { currentUser } = useAuth();

  return currentUser === null ? <Outlet /> : <TodoList />;
}
