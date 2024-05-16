import "./MainLayout.css";
import UserDetails from "../UserDetails/UserDetails";
import Breadcrumbs from "../Breadcrumb/Breadcrumb";
import { useAuthContext } from "../../context/AuthContext";
import BackButton from "../BackButton";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  const { user } = useAuthContext();

  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <div className="main-layout">
      <UserDetails />
      <div className="main-page-content">
        <div className="title"> {user.role} PORTAL </div>
        <Breadcrumbs />
        <div className="course-info">
          {pathSegments.length > 0 && <BackButton />}
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
