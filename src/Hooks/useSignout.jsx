import { useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
import useToast from "./useToast";

const useSignout = () => {
  const { setIsAuth, setToken, setUser } = useContext(LoginContext);

  const signout = () => {
    setToken("");
    setIsAuth(false);
    setUser({ login: null, role: null });
    useToast("Signed out successfully", "success");
    console.log("successful signout");
  };

  return signout;
};

export default useSignout;
