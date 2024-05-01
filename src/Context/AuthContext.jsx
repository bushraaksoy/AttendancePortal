import { createContext, useContext } from "react";
import useLocalstorage from "../hooks/useLocalstorage";
import { useNavigate } from "react-router-dom";
import useAuthToken from "../hooks/useAuthToken";

const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useLocalstorage("user");
  const { getAuthToken, clearAuthToken } = useAuthToken();

  const isAuthenticated = () => {
    const token = getAuthToken();
    return !!token;
  };

  const signout = () => {
    clearAuthToken();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
