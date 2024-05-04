import "./CoursesTable.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import MainLayout from "../MainLayout/MainLayout";
import { formatDateAndTime } from "../../utils";
import { useEffect, useState } from "react";

const CoursesTable = () => {
  const { user } = useAuthContext();
  const url = `/${user.role.toLowerCase()}/courses`;

  // extract token from URL search params
  const authResult = new URLSearchParams(window.location.search);
  const token = authResult.get("token");

  const urlAttendance = `/student/attendance/take/qr/${token}`; // url that will automatically take the attendance for the student

  // state for showing QR accepting popup
  const [qrAcceptingPopupVisible, setQrAcceptingPopupVisible] = useState(false);

  // Set popup visibility based on token presence
  useEffect(() => {
    if (token) {
      setQrAcceptingPopupVisible(true);
    }
  }, [token]);

  const {
    data: courses,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });

  console.log(courses);

  return (
    <MainLayout>
      <>
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
              {courses &&
                courses.map((course) => (
                  <tr id={course.id} key={course.id}>
                    <td className="course-id">
                      {
                        <Link
                          to={`/${course.id}/groups?code=${course.code}&name=${course.name}&id=${course.id}`}
                        >
                          {course.code}
                        </Link>
                      }
                    </td>
                    <td>{course.name}</td>
                    <td>{course.total_hours}</td>

                    <td>
                      <div className="view">
                        <Link
                          to={`/${course.id}/groups?code=${course.code}&name=${course.name}&id=${course.id}`}
                        >
                          view
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
      {/* <div
        className={`qr-accepting-popup ${
          qrAcceptingPopupVisible ? "" : "hide"
        }`}
      >
        <div className="loader"></div>
      </div> */}
    </MainLayout>
  );
};

export default CoursesTable;
