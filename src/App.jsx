import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useEffect, useState } from "react";
import { LoginContext } from "./Context/LoginContext";
import { ToastContainer } from "react-toastify";
import Schedule from "./pages/Schedule/Schedule";
import ConfirmAttendance from "./components/ConfirmAttendance/ConfirmAttendance";
import TeacherQrCode from "./components/QrCodeGenerator/TeacherQrCode";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [isAuthenticated, setIsAuth] = useState(() => {
    const savedAuth = JSON.parse(localStorage.getItem("isAuth"));
    return savedAuth || false;
  });

  useEffect(() => {
    const savedAuth = JSON.parse(localStorage.getItem("isAuth")) || false;
    setIsAuth(savedAuth);
  }, []);

  return (
    <LoginContext.Provider value={{ isAuthenticated, setIsAuth }}>
      <ToastContainer position="top-right" theme="colored" />
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <div className="main">
                <Sidebar />
                <div className="page-content">
                  <Dashboard />
                </div>
              </div>
            }
          />
          <Route
            path="/department-schedule"
            element={
              <div className="main">
                <Sidebar />
                <div className="page-content">
                  <Schedule />
                </div>
              </div>
            }
          />
          <Route
            path="/confirm-attendance"
            element={
              <div className="main">
                <Sidebar />
                <div className="page-content">
                  <ConfirmAttendance />
                </div>
              </div>
            }
          />
          <Route
            path="teacher-qr-code"
            element={
              <div className="main">
                <Sidebar />
                <div className="page-content">
                  <TeacherQrCode />
                </div>
              </div>
            }
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
