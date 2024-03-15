import { createContext } from "react";

export const LoginContext = createContext({
  isAuth: false,
  token: null,
  user: null,
  setIsAuth: () => {},
  setToken: () => {},
  setUser: () => {},
});
