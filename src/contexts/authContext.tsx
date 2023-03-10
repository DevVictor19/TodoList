import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { IAuthContext } from "../ts/interfaces/AuthContext";
import { CurrentUser } from "../ts/types/CurrentUser";

export const AuthContext = createContext<IAuthContext | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthContextProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      signup,
      login,
      logout,
    }),
    [currentUser, login, signup]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
