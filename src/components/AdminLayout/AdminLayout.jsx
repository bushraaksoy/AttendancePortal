import "./AdminLayout.css";
import Sidebar from "../Sidebar/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-page-content">
        <div className="course-info">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
