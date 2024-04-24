import { createContext, useContext } from "react";
import useLocalstorage from "../Hooks/useLocalstorage";

const LoginContext = createContext({
  user: null,
  setUser: () => {},
});

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useLocalstorage("user");

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
