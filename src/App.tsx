import { useScreenWidth } from "./hooks/useScreenWidth";
import { Menu } from "./components/Menu";
import { AppRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export function App() {
  const screenWidth = useScreenWidth();

  return (
    <>
      <ToastContainer
        className="text-sm"
        limit={screenWidth > 480 ? 3 : 1}
        theme="colored"
        autoClose={screenWidth > 480 ? 2000 : 1000}
      />
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
