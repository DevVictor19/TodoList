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

export function useFirestoreTodos(userId: string) {
  const collectionRef = collection(db, "users", userId, "todos");

  const getTodos = () => {
    return getDocs(query(collectionRef));
  };

  const addTodo = (newTodo: ITodo) => {
    return setDoc(doc(db, "users", userId, "todos", newTodo.id), newTodo);
  };

  const removeTodo = (id: string) => {
    return deleteDoc(doc(db, "users", userId, "todos", id));
  };

  const toggleCompleteTodo = (id: string, currentState: boolean) => {
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
