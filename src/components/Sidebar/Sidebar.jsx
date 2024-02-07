import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/department-schedule">Schedule</Link>
        </li>
        <li>
          <Link to="/confirm-attendance">Confirm Attendance</Link>
        </li>
        <li>
          <Link to="/teacher-qr-code">Teacher QR code</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
