import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase.config";
import { Task } from "../interfaces/Task";

export function useFirestore(userId: string) {
  const tasksCollection = collection(db, "users", userId, "tasks");

  // inserir task
  const addTask = (task: Task) => {
    return addDoc(tasksCollection, task);
  };

  // buscar tasks
  const getTasks = () => {
    return getDocs(query(tasksCollection));
  };
  // editar task

  return {
    addTask,
    getTasks,
  };
}
