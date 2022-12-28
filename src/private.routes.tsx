import { useAuth } from "./hooks/useAuth";
import { Outlet } from "react-router-dom";
import { IAuthContext } from "./interfaces/AuthContext";
import { Todo } from "./components/Todo";

export function PrivateRoutes() {
  const { currentUser } = useAuth() as IAuthContext;

  return currentUser === null ? <Outlet /> : <Todo />;
}
