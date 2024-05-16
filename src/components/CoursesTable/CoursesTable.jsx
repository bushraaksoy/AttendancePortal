import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import MainLayout from "../MainLayout/MainLayout";
import yes from "/correct.png";
import no from "/delete.png";
import "./CoursesTable.css";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader";

const CoursesTable = () => {
  const authResult = new URLSearchParams(window.location.search);
  const token = authResult.get("token");
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const URL = `/${user.role.toLowerCase()}/courses`;
  const url = import.meta.env.VITE_APP_API_BASE_URL + URL;

  const [qrLoadingVisible, setQrLoadingVisible] = useState(false);
  const [qrState, setQrState] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const {
    data: courses,
    loading,
    error,
  } = useFetch(URL, { method: "GET", headers: {} });

  // Handle QR code token validation
  useEffect(() => {
    if (token) {
      setQrLoadingVisible(true);
      setQrState({ loading: true, success: false, error: null });
      const urlQr =
        import.meta.env.VITE_APP_API_BASE_URL +
        `/student/attendance/take/qr/${token}`;
      const fetchData = async () => {
        try {
          const response = await fetch(urlQr, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage
                .getItem("token")
                ?.replace(/"/g, "")}`,
            },
          });
          if (!response.ok) throw new Error("Failed to validate QR code");
          await response.json();
          setQrState({ loading: false, success: true, error: null });
        } catch (error) {
          setQrState({ loading: false, success: false, error: error.message });
        }
      };
      fetchData();
    }
  }, [token]);

  const removeTokenParam = () => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has("token")) {
      urlParams.delete("token");
      navigate(`${location.pathname}?${urlParams.toString()}`, {
        replace: true,
      });
    }
  };

  // to hide loading after attendance setting
  const handleContainerClick = () => {
    console.log("clicked");
    setQrLoadingVisible(false);
    removeTokenParam();
  };

  if (loading)
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );

  return (
    <MainLayout>
      <div className="prompt">Select course to take attendance!</div>
      <h2>Courses</h2>
      <div className="table-div">
        <table className="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Course name</th>
              <th>Hours</th>
              <th>Groups</th>
            </tr>
          </thead>
          <tbody>
            {courses &&
              courses.map((course) => (
                <tr key={course.id}>
                  <td className="course-id">
                    <Link
                      to={`/${course.id}?code=${course.code}&name=${course.name}&id=${course.id}`}
                    >
                      {course.code}
                    </Link>
                  </td>
                  <td>{course.name}</td>
                  <td>{course.total_hours}</td>
                  <td>
                    <Link
                      className="view"
                      to={`/${course.id}?code=${course.code}&name=${course.name}&id=${course.id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div
        className={`qr-accepting-popup ${qrLoadingVisible ? "" : "hide"}`}
        onClick={handleContainerClick}
      >
        {qrState.loading && <div className="loader"></div>}
        {qrState.success && (
          <>
            <img
              src={yes}
              alt="success"
              width={250}
              className="attendance-attempt"
            />
            <div className="message success">
              Attendance taken successfully!
            </div>
          </>
        )}
        {qrState.error && (
          <>
            <img
              src={no}
              alt="error"
              width={250}
              className="attendance-attempt"
            />
            <div className="message error">
              Failed to mark attendance - Error message: {qrState.error}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default CoursesTable;
