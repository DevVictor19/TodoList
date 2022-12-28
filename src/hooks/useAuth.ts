import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { IAuthContext } from "../interfaces/AuthContext";

export function useAuth() {
  return useContext(AuthContext) as IAuthContext;
}
