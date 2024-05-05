import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import MainLayout from "../MainLayout/MainLayout";
import "./CoursesTable.css";

const CoursesTable = () => {
  const authResult = new URLSearchParams(window.location.search);
  const token = authResult.get("token");
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const URL = `/${user.role.toLowerCase()}/courses`;
  const url = import.meta.env.VITE_APP_API_BASE_URL + URL;

  const [qrLoadingVisible, setQrLoadingVisible] = useState(false);
  const [courses, setCourses] = useState([]);
  const [qrState, setQrState] = useState({
    loading: false,
    success: false,
    error: null,
  });

  // Fetch courses data
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("token")
              ?.replace(/"/g, "")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [url]);

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

  return (
    <MainLayout>
      <div className="prompt">Select course to take attendance!</div>
      <h2>Courses</h2>
      <div className="table-div">
        <table className="courses-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Course name</th>
              <th>Hours</th>
              <th>Groups</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="course-id">
                  <Link
                    to={`/${course.id}/groups?code=${course.code}&name=${course.name}&id=${course.id}`}
                  >
                    {course.code}
                  </Link>
                </td>
                <td>{course.name}</td>
                <td>{course.total_hours}</td>
                <td>
                  <div className="view">
                    <Link
                      to={`/${course.id}/groups?code=${course.code}&name=${course.name}&id=${course.id}`}
                    >
                      View
                    </Link>
                  </div>
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
            <div className="checkmark-circle">
              <div className="checkmark"></div>
            </div>
            <div className="message success">
              Attendance taken successfully!
            </div>
          </>
        )}
        {qrState.error && (
          <>
            <div className="xmark-circle">
              <div className="xmark"></div>
            </div>
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
