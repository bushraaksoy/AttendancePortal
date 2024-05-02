import "./MainLayout.css";
import UserDetails from "../UserDetails/UserDetails";
import Breadcrumbs from "../Breadcrumb/Breadcrumb";
import { useAuthContext } from "../../context/AuthContext";

const MainLayout = ({ children }) => {
  const { user } = useAuthContext();

  return (
    <div className="main-layout">
      <UserDetails />
      <div className="main-page-content">
        <div className="title"> {user.role} PORTAL </div>
        <Breadcrumbs
          crumbs={[
            "Home",
            "Courses",
            "Software Architecture and Design Patterns",
          ]}
        />
        <div className="course-info">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
