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
import { Todo } from "../interfaces/Todo";

export function useFirestore(userId: string) {
  const collectionRef = collection(db, "users", userId, "todos");

  const getTodos = async () => {
    let dbTodos: Todo[] = [];

    try {
      const querySnapShot = await getDocs(query(collectionRef));

      querySnapShot.forEach((doc) => {
        dbTodos.push(doc.data() as Todo);
      });
    } catch (error) {
      console.log(error);
    }

    return dbTodos;
  };

  const addTodo = async (newTodo: Todo) => {
    try {
      await setDoc(doc(db, "users", userId, "todos", newTodo.id), newTodo);
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, "users", userId, "todos", id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCompleteTodo = async (id: string, currentState: boolean) => {
    try {
      await updateDoc(doc(db, "users", userId, "todos", id), {
        completed: !currentState,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getTodos,
    addTodo,
    removeTodo,
    toggleCompleteTodo,
  };
}