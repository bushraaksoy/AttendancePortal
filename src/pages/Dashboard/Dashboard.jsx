import { AdminLayout } from "../../components";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <AdminLayout>
      <>
        <h2>Admin Panel</h2>
        <div>Hello and welcome to the Admin Panel!</div>
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/web-admin-panel-4439075-3726750.png"
          alt="dashboard image"
        />
      </>
    </AdminLayout>
  );
};

export default Dashboard;
