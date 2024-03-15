import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useEffect, useState } from "react";
import { LoginContext } from "./Context/LoginContext";
import { ToastContainer } from "react-toastify";
import ConfirmAttendance from "./components/ConfirmAttendance/ConfirmAttendance";
import TeacherQrCode from "./components/QrCodeGenerator/TeacherQrCode";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AttendanceRequest from "./pages/AttendaceRequest/AttendanceRequest";
import MainLayout from "./components/MainLayout/MainLayout";
import CoursesTable from "./components/CoursesTable/CoursesTable";
import useLocalstorage from "./Hooks/useLocalstorage";
import Statistics from "./components/Statistics/Statistics";
import AddUser from "./components/AddUser/AddUser";
import CourseDetails2 from "./components/CourseDetails/CourseDetails2";
import AllCoursesTable from "./pages/AllCoursesTable/AllCoursesTable";
import CourseStudents from "./components/CourseStudents/CourseStudents";
import AttendanceRequests from "./components/AttendanceRequests/AttendanceRequests";

function App() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuth] = useLocalstorage("isAuth");
  const [token, setToken] = useLocalstorage("token");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return (
    // Map all routes when complete

    <LoginContext.Provider
      value={{ isAuthenticated, setIsAuth, token, setToken }}
    >
      <ToastContainer position="top-right" />
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <Login />
              ) : (
                <MainLayout children={<CoursesTable />} />
              )
            }
          />
          <Route
            path="/:courseId"
            element={<MainLayout children={<CourseDetails2 />} />}
          />
          <Route
            path="/:courseId/attendance-request"
            element={<AttendanceRequest />}
          />
          <Route
            path="/statistics"
            element={<MainLayout children={<Statistics />} />}
          />
          {/* routes for admin */}
          <Route
            path="/dashboard"
            element={<AdminLayout children={<Dashboard />} />}
          />
          <Route
            path="/all-courses"
            element={<AdminLayout children={<AllCoursesTable />} />}
          />
          <Route
            path="/:courseId/students"
            element={<AdminLayout children={<CourseStudents />} />}
          />
          <Route
            path="/attendance-requests"
            element={<AdminLayout children={<AttendanceRequests />} />}
          />
          {/* takes you to the list of students taking the course */}
          <Route
            path="/confirm-attendance"
            element={<AdminLayout children={<ConfirmAttendance />} />}
          />
          <Route
            path="/statistics"
            element={<AdminLayout children={<Statistics />} />}
          />
          <Route
            path="/add-user"
            element={<AdminLayout children={<AddUser />} />}
          />
          {/* For teacher */}
          <Route
            path="teacher-qr-code"
            element={<AdminLayout children={<TeacherQrCode />} />}
          />
        </Routes>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
