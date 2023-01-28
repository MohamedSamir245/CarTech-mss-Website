import { createContext, useContext } from "react";

export const AuthContext = createContext();
export const AuthUpdateContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useUpdateAuth = () => {
  return useContext(AuthUpdateContext);
};
