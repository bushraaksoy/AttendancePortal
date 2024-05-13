import { AdminLayout } from "../../components";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <AdminLayout>
      <>
        <h2>Admin Panel</h2>
        <div>Hello and welcome to the Admin Panel!</div>
        <span>
          <img
            // src="https://cdni.iconscout.com/illustration/premium/thumb/web-admin-panel-4439075-3726750.png"
            width={420}
            src="https://cdni.iconscout.com/illustration/premium/thumb/admin-control-panel-4487949-3722637.png?f=webp"
            alt="dashboard image"
          />
          <img
            width={300}
            src="https://cdni.iconscout.com/illustration/premium/thumb/web-admin-panel-4439075-3726750.png"
            // src="https://cdni.iconscout.com/illustration/premium/thumb/admin-control-panel-4487949-3722637.png?f=webp"
            alt="dashboard image"
          />
        </span>
      </>
    </AdminLayout>
  );
};

export default Dashboard;
