import { useCallback, useEffect, useState } from "react";
import { Bar } from "./Bar";
import { Filter } from "./Filter";
import { List } from "./List";
import { useAuth } from "../../hooks/useAuth";
import { useFirestore } from "../../hooks/useFirestore";
import { Task } from "../../interfaces/Task";

export function Todo() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { getTasks, addTask } = useFirestore(currentUser!.uid);

  const handleGetTasks = async () => {
    setLoading(true);
    try {
      const querySnapShot = await getTasks();

      const tasks: Task[] = [];

      querySnapShot.forEach((doc) => {
        tasks.push(doc.data() as Task);

        setTasks(tasks);
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleAddTask = useCallback(
    async (task: Task) => {
      try {
        await addTask({
          id: tasks.length.toString(),
          name: task.name,
          completed: task.completed,
        });
        setTasks((prev) => prev.concat(task));
      } catch (error) {
        console.log(error);
      }
    },
    [addTask, setTasks]
  );

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <>
      <Bar onSubmit={handleAddTask} />
      <List tasks={tasks} />
      <Filter />
    </>
  );
}
