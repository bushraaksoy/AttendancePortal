import "./AdminLayout.css";
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumbs from "../Breadcrumb/Breadcrumb";

const AdminLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-page-content">
        <Breadcrumbs />
        <div className="course-info">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
