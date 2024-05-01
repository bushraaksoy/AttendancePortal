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
      <ul>
        {Object.entries(sidebarItems).map(([key, value], inx) => (
          <li key={inx}>
            <Link to={`/${key}`}>{value}</Link>
          </li>
        ))}
        <li>
          <Link to={"/login"} onClick={signout}>
            Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
