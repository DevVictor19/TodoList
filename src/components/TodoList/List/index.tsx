import { Todo } from "../../../interfaces/Todo";
import { Card } from "../../Card";
import { ListItem } from "./ListItem";
import { ListMenu } from "./ListMenu";

interface Props {
  todos: Todo[];
  onRemoveTodo: (id: string) => void;
  onToggleComplete: (id: string, newState: boolean) => void;
}

export function List({ todos, onRemoveTodo, onToggleComplete }: Props) {
  return (
    <Card styleClasses="mt-4 max-h-[368px] h-full">
      <div>
        <ul className="max-h-[317px] h-[315px] overflow-auto">
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              id={todo.id}
              name={todo.name}
              completed={todo.completed}
              onRemoveTodo={onRemoveTodo}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </ul>
        <ListMenu />
      </div>
    </Card>
  );
}
