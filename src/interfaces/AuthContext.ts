import { User, UserCredential } from "firebase/auth";

export type CurrentUser = User | null;

export interface IAuthContext {
  currentUser: CurrentUser;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}
