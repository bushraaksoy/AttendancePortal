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

function App() {
  const navigate = useNavigate();

  // save the value of isAuth from localstorage to isAuthenticated, and false if it does not exist
  const [isAuthenticated, setIsAuth] = useState(() => {
    const savedAuth = JSON.parse(localStorage.getItem("isAuth"));
    return savedAuth || false;
  });

  // update isAuth in local storage each time isAuthenticated changes
  useEffect(() => {
    localStorage.setItem("isAuth", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

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
          <Route
            path="teacher-qr-code"
            element={<AdminLayout children={<TeacherQrCode />} />}
          />
        </Routes>

        {/* {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/department-schedule" element={<Schedule />} />
            <Route path="/confirm-attendance" element={<ConfirmAttendance />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )} */}
      </div>
    </LoginContext.Provider>
  );
}

export default App;
