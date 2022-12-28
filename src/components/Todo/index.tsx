import { useCallback, useEffect, useState } from "react";
import { Bar } from "./Bar";
import { Filter } from "./Filter";
import { List } from "./List";
import { useAuth } from "../../hooks/useAuth";
import { Task } from "../../interfaces/Task";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";

export function Todo() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const querySnapShot = await getDocs(
          collection(db, "users", currentUser!.uid, "tasks")
        );

        const dbTasks: Task[] = [];

        querySnapShot.forEach((doc) => {
          dbTasks.push(doc.data() as Task);
        });

        setTasks(dbTasks);
      } catch (e) {
        console.log(e);
      }
    };

    console.log("useeffect");

    getTasks();
  }, []);

  const handleAddTask = useCallback(
    (task: Task) => {
      setTasks((prev) => prev.concat(task));
    },
    [setTasks]
  );

  const handleRemoveTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const handleToggleCompleteTask = useCallback(
    (id: string, newState: boolean) => {
      setTasks((prev) =>
        prev.map((task) => ({
          id: task.id,
          name: task.name,
          completed: task.id === id ? newState : task.completed,
        }))
      );
    },
    [setTasks]
  );

  return (
    <>
      <Bar onSubmit={handleAddTask} />
      <List
        tasks={tasks}
        onRemove={handleRemoveTask}
        onToggleComplete={handleToggleCompleteTask}
      />
      <Filter />
    </>
  );
}
