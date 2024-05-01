import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./Context/AuthContext";
import { ToastContainer } from "react-toastify";
import CustomRoutes from "./routes/Route";

function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" />
      <div className="app">
        <CustomRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
