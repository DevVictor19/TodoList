import { FilterOptions } from "../../../ts/types/FilterOptions";
import { Card } from "../../Card";

const activeClassStyles = "text-[#3A7CFD] font-bold";

interface Props {
  onSetFilter: (filter: FilterOptions) => void;
  currentFilter: FilterOptions;
}

export function Filter({ onSetFilter, currentFilter }: Props) {
  return (
    <Card styleClasses="mt-4">
      <nav
        className="p-4 text-[#9495A5] dark:text-[#5B5E7E] text-sm
      flex items-center justify-center gap-5 w-full"
      >
        <button
          className={currentFilter === "all" ? activeClassStyles : ""}
          onClick={() => onSetFilter("all")}
        >
          All
        </button>
        <button
          className={currentFilter === "active" ? activeClassStyles : ""}
          onClick={() => onSetFilter("active")}
        >
          Active
        </button>
        <button
          className={currentFilter === "completed" ? activeClassStyles : ""}
          onClick={() => onSetFilter("completed")}
        >
          Completed
        </button>
      </nav>
    </Card>
  );
}
