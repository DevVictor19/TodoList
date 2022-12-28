import { Task } from "../../../interfaces/Task";
import { Card } from "../../Card";
import { ListItem } from "./ListItem";
import { ListMenu } from "./ListMenu";

interface Props {
  tasks: Task[];
  onRemove: (id: string) => void;
  onToggleComplete: (id: string, newState: boolean) => void;
}

export function List({ tasks, onRemove, onToggleComplete }: Props) {
  return (
    <Card styleClasses="mt-4 max-h-[368px] h-full">
      <div>
        <ul className="max-h-[317px] h-[315px] overflow-auto">
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              id={task.id}
              name={task.name}
              completed={task.completed}
              onRemove={onRemove}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </ul>
        <ListMenu />
      </div>
    </Card>
  );
}
