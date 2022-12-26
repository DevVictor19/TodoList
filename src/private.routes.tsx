import { useAuth } from "./hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContextInterface } from "./interfaces/authContextInterface";
import { Todo } from "./components/Todo";

export function PrivateRoutes() {
  const { currentUser } = useAuth() as AuthContextInterface;

  return currentUser === null ? <Outlet /> : <Todo />;
}
