import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  AuthContextInterface,
  CurrentUser,
} from "../interfaces/authContextInterface";

export const AuthContext = createContext<AuthContextInterface | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthContextProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);

  const signup = useCallback(
    (email: string, password: string) => {
      return createUserWithEmailAndPassword(auth, email, password);
    },
    [createUserWithEmailAndPassword]
  );

  const login = useCallback(
    (email: string, password: string) => {
      return signInWithEmailAndPassword(auth, email, password);
    },
    [signInWithEmailAndPassword]
  );

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
    }),
    [currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
