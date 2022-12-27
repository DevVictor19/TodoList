import { Card } from "../../Card";
import { ListItem } from "./ListItem";
import { ListMenu } from "./ListMenu";

export function List() {
  return (
    <Card styleClasses="mt-4 max-h-[368px] h-full">
      <div>
        <ul className="max-h-[317px] overflow-auto">
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </ul>
        <ListMenu />
      </div>
    </Card>
  );
}
