import React from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { formatDateAndTime } from "../../utils";

const AdminAttendance = () => {
  const { courseId, courseGroup, studentId } = useParams();
  const authResult = new URLSearchParams(window.location.search);
  const courseCode = authResult.get("code");
  const studentName = authResult.get("studentName");

  // /all-courses/:courseId/:courseGroup/:studentId/attendance

  const url = `/admin/attendance/courses/${courseId}/${courseGroup}/students/${studentId}`;

  const {
    data: attendance,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });

  if (loading)
    return (
      <AdminLayout>
        <img width={50} src="https://i.gifer.com/ZKZg.gif" />
      </AdminLayout>
    );

  console.log(attendance);

  return (
    <AdminLayout>
      <>
        <div className="prompt">View student attendance records!</div>
        <h2>{studentName}</h2>
        <div className="table-div">
          <table className="table">
            <thead>
              <tr>
                {/* <th>Student</th> */}
                <th>Code</th>
                <th>Group</th>
                <th>Time</th>
                <th>Date</th>
                <th>Method</th>
                <th>Attended</th>
                <th>Attendance By</th>
              </tr>
            </thead>
            <tbody>
              {attendance &&
                attendance.map((entry, index) => {
                  const { dateStr, timeStr } = formatDateAndTime(entry.time);

                  return (
                    <tr key={entry.id}>
                      {/* <td>{entry.student}</td> */}
                      <td>{courseCode}</td>
                      <td>{entry.courseGroup}</td>
                      <td>{timeStr}</td>
                      <td>{dateStr}</td>
                      <td>
                        <div
                          className={
                            "text " +
                            (entry.attendanceType &&
                              entry.attendanceType.toLowerCase())
                          }
                        >
                          {entry.attendanceType}
                        </div>
                      </td>
                      <td>
                        <div
                          className={`text ${
                            entry.attendanceStatus === "EXCUSE_ABSENCE"
                              ? "permitted-"
                              : entry.attendanceStatus.toLowerCase()
                          }`}
                        >
                          {entry.attendanceStatus === "EXCUSE_ABSENCE"
                            ? "PERMITTED"
                            : entry.attendanceStatus}
                        </div>
                      </td>
                      <td>{entry.designatedStudent}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    </AdminLayout>
  );
};

export default AdminAttendance;
