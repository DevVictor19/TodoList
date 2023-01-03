import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import { Menu } from "./components/Menu";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <>
      <ToastContainer />
      <div
        className="min-h-screen bg-[#FAFAFA] dark:bg-[#171823] flex 
        justify-center bg-[url('/bg-light.png')] dark:bg-[url('/bg-dark.png')]
        bg-no-repeat bg-[auto_240px]"
      >
        <main className="max-w-[540px] w-full px-6">
          <Menu />
          <AppRoutes />
        </main>
      </div>
    </>
  );
}
