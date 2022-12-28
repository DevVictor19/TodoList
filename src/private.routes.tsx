import { useAuth } from "./hooks/useAuth";
import { Outlet } from "react-router-dom";
import { Todo } from "./components/Todo";

export function PrivateRoutes() {
  const { currentUser } = useAuth();

  return currentUser === null ? <Outlet /> : <Todo />;
}
