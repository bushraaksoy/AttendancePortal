import { Link } from "react-router-dom";
import "./Sidebar.css";
import sduLogo from "/logo_sdu.png";
import useSignout from "../../Hooks/useSignout";

const Sidebar = () => {
  const sidebarItems = {
    dashboard: "Dashboard",
    "all-courses": "Courses",
    "attendance-requests": "Requests",
  };

  const signout = useSignout();

  return (
    <div className="sidebar">
      <img src={sduLogo} alt="SDU logo" width={130} />
      {/* <h3>Admin Panel</h3> */}
      <ul>
        {Object.entries(sidebarItems).map((item, inx) => (
          <li key={inx}>
            <Link to={`/${item[0]}`}>{item[1]}</Link>
          </li>
        ))}
        <li>
          <Link onClick={signout}>Sign Out</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

{
  /* <li>
  <Link to="/dashboard">Dashboard</Link>
</li>
<li>
  <Link to="/all-courses">Courses</Link>
</li>
<li>
  <Link to="/attendace-requests">Attendance Requests</Link>
</li>
<li>
  <Link to="/teacher-qr-code">Teacher QR code</Link>
</li>
<li>
  <Link to="/add-user">Add User</Link>
</li>
<li>
  <Link>Sign Out</Link>
</li> */
}
