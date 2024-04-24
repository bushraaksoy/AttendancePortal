import { useLoginContext } from "../Context/LoginContext";
import useToast from "./useToast";
import { useNavigate } from "react-router-dom";

const useSignout = () => {
  const navigate = useNavigate();
  const { setUser } = useLoginContext();

  const signout = () => {
    localStorage.removeItem("token");
    setUser({ login: null, role: null });
    useToast("Signed out successfully", "success");
    console.log("successful signout");
    navigate("/login");
  };

  return signout;
};

export default useSignout;
