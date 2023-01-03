import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { ITodo } from "../ts/interfaces/Todo";
import { useAuth } from "./useAuth";

export function useFirestoreTodos() {
  const userId = useAuth().currentUser!.uid;
  const collectionRef = collection(db, "users", userId, "todos");

  const getTodos = async () => {
    return getDocs(query(collectionRef));
  };

  const addTodo = (newTodo: ITodo) => {
    return setDoc(doc(db, "users", userId, "todos", newTodo.id), newTodo);
  };

  const removeTodo = (id: string) => {
    return deleteDoc(doc(db, "users", userId, "todos", id));
  };

  const toggleCompleteTodo = async (id: string, currentState: boolean) => {
    return updateDoc(doc(db, "users", userId, "todos", id), {
      completed: !currentState,
    });
  };

  return {
    getTodos,
    addTodo,
    removeTodo,
    toggleCompleteTodo,
  };
}
