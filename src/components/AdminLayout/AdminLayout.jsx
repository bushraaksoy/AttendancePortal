import "./AdminLayout.css";
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumbs from "../Breadcrumb/Breadcrumb";
import BackButton from "../BackButton";
import { useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-page-content">
        <Breadcrumbs />
        <div className="course-info">
          {pathSegments.length > 1 && <BackButton />}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
