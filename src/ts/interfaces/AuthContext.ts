import { UserCredential } from "firebase/auth";
import { CurrentUser } from "../types/CurrentUser";

export interface IAuthContext {
  currentUser: CurrentUser;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}
