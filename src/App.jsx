import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import LoginProvider from "./Context/LoginContext";
import { ToastContainer } from "react-toastify";

import ConfirmAttendance from "./components/ConfirmAttendance/ConfirmAttendance";
import TeacherQrCode from "./components/QrCodeGenerator/TeacherQrCode";
import CourseStudents from "./components/CourseStudents/CourseStudents";
import AttendanceRequests from "./components/AttendanceRequests/AttendanceRequests";
import CourseDetails from "./components/CourseDetails/CourseDetails";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import MainLayout from "./components/MainLayout/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import AllCoursesTable from "./pages/AllCoursesTable/AllCoursesTable";

import PrivateRoutes from "./routes/PrivateRoutes";

import { Login, CoursesTable } from "./components";
import CustomRoutes from "./routes/Route";

function App() {
  return (
    <LoginProvider>
      <ToastContainer position="top-right" />
      <div className="app">
        <CustomRoutes />
      </div>
    </LoginProvider>
  );
}

export default App;
