import { Outlet, Navigate } from "react-router-dom";
import { useLoginContext } from "../Context/LoginContext";

const PrivateRoutes = ({ roles }) => {
  const { user } = useLoginContext();

  return roles.includes(user.role) ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
