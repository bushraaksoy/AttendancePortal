import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";

const PrivateRoutes = ({ roles }) => {
  const { user } = useContext(LoginContext);

  return roles.includes(user.role) ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
