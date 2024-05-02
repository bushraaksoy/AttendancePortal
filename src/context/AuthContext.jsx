import { createContext, usecontext } from "react";
import useLocalstorage from "../hooks/useLocalstorage.jsx";
import { useNavigate } from "react-router-dom";
import useAuthToken from "../hooks/useAuthToken.jsx";

const Authcontext = createContext({
  user: null,
  setUser: () => {},
});

export const useAuthcontext = () => useContext(AuthContext);

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
