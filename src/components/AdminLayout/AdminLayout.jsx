import "./AdminLayout.css";
import Sidebar from "../Sidebar/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="main">
      <Sidebar />
      <div className="page-content"> {children} </div>
    </div>
  );
};

export default AdminLayout;
