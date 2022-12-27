import { Card } from "../../Card";

type FilterOptions = "all" | "active" | "completed";

const filter: FilterOptions = "all";
const activeClassStyles = "text-[#3A7CFD] font-bold";

export function Filter() {
  let allItems = false;
  let activeItems = false;
  let completedItems = false;

  switch (filter) {
    case "all":
      allItems = true;
      break;
    case "active":
      activeItems = true;
      break;
    case "completed":
      completedItems = true;
      break;
  }

  const handleSetFilter = (filter: FilterOptions) => {
    alert("set filter: " + filter);
  };

  return (
    <Card styleClasses="mt-4">
      <nav
        className="p-4 text-[#9495A5] dark:text-[#5B5E7E] text-sm
      flex items-center justify-center gap-5 w-full"
      >
        <button
          className={allItems ? activeClassStyles : ""}
          onClick={() => handleSetFilter("all")}
        >
          All
        </button>
        <button
          className={activeItems ? activeClassStyles : ""}
          onClick={() => handleSetFilter("active")}
        >
          Active
        </button>
        <button
          className={completedItems ? activeClassStyles : ""}
          onClick={() => handleSetFilter("completed")}
        >
          Completed
        </button>
      </nav>
    </Card>
  );
}
