import { Menu } from "./components/Menu";

export function App() {
  return (
    <div
      className="min-h-screen bg-[#FAFAFA] dark:bg-[#171823] flex 
    justify-center bg-[url('/bg-light.png')] dark:bg-[url('/bg-dark.png')]
    bg-no-repeat bg-[auto_200px]"
    >
      <main className="max-w-[540px] w-full px-6">
        <Menu />
      </main>
    </div>
  );
}
