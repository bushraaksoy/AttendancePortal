import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useEffect, useState } from "react";
import { LoginContext } from "./Context/LoginContext";
import { ToastContainer } from "react-toastify";
import Schedule from "./pages/Schedule/Schedule";
import ConfirmAttendance from "./components/ConfirmAttendance/ConfirmAttendance";
import TeacherQrCode from "./components/QrCodeGenerator/TeacherQrCode";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import AttendanceRequest from "./pages/AttendaceRequest/AttendanceRequest";
import MainLayout from "./components/MainLayout/MainLayout";
import CoursesTable from "./components/CoursesTable/CoursesTable";
import useLocalstorage from "./Hooks/useLocalstorage";

function App() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuth] = useLocalstorage("isAuth");

  if (!isAuthenticated) {
    navigate("/login");
  }

  return (
    <LoginContext.Provider value={{ isAuthenticated, setIsAuth }}>
      <ToastContainer position="top-right" theme="colored" />
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
            element={<MainLayout children={<CourseDetails />} />}
          />
          <Route
            path="/:courseId/attendance-request"
            element={<AttendanceRequest />}
          />
          {/* routes for admin */}
          <Route
            path="/dashboard"
            element={<AdminLayout children={<Dashboard />} />}
          />
          <Route
            path="/department-schedule"
            element={<AdminLayout children={<Schedule />} />}
          />
          <Route
            path="/confirm-attendance"
            element={<AdminLayout children={<ConfirmAttendance />} />}
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
