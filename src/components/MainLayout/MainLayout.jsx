import "./MainLayout.css";
import UserDetails from "../UserDetails/UserDetails";
import Breadcrumbs from "../Breadcrumb/Breadcrumb";
import { useLoginContext } from "../../Context/LoginContext";

const MainLayout = ({ children }) => {
  const { user } = useLoginContext();

  return (
    <div className="layout">
      <UserDetails />
      <div className="page-content">
        <div className="title"> {user.role} PORTAL </div>
        <Breadcrumbs
          crumbs={[
            "Home",
            "Courses",
            "Software Architecture and Design Patterns",
          ]}
        />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
