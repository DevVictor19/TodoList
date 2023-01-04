import { lazy, Suspense } from "react";
import { useAuth } from "./hooks/useAuth";
import { Outlet } from "react-router-dom";
import { Spinner } from "./components/Spinner";

const TodoList = lazy(() =>
  import("./components/TodoList").then((module) => ({
    default: module.TodoList,
  }))
);

export function PrivateRoutes() {
  const { currentUser } = useAuth();

  return currentUser === null ? (
    <Outlet />
  ) : (
    <Suspense
      fallback={
        <Spinner
          containerClassName="min-h-[200px] flex items-center justify-center"
          contentClassName="text-transparent fill-[#fff]"
        />
      }
    >
      <TodoList />
    </Suspense>
  );
}
