import { Todo } from "../../../interfaces/Todo";
import { Card } from "../../Card";
import { ListItem } from "./ListItem";
import { ListMenu } from "./ListMenu";

interface Props {
  todos: Todo[];
  onRemoveTodo: (id: string) => void;
  onToggleCompleteTodo: (id: string, currentState: boolean) => void;
  onClearCompletedTodos: () => void;
  incompletedTodosNumber: number;
}

export function List({
  todos,
  onRemoveTodo,
  onToggleCompleteTodo,
  onClearCompletedTodos,
  incompletedTodosNumber,
}: Props) {
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
              onToggleCompleteTodo={onToggleCompleteTodo}
            />
          ))}
        </ul>
        <ListMenu
          incompletedTodosNumber={incompletedTodosNumber}
          onClearCompletedTodos={onClearCompletedTodos}
        />
      </div>
    </Card>
  );
}
