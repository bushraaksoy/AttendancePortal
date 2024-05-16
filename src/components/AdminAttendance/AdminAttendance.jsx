import React from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { formatDateAndTime, formatTime } from "../../utils";
import Loader from "../Loader";

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
        <Loader />
      </AdminLayout>
    );

  console.log(attendance);

  return (
    <AdminLayout>
      <>
        <div className="prompt">View student attendance records!</div>
        <h2>{studentName}</h2>
        <h5>
          {courseCode} / {courseGroup}
        </h5>
        <div className="table-div">
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Date</th>
                <th>Entry Time</th>
                <th>Method</th>
                <th>Attended</th>
                <th>Designated Person</th>
              </tr>
            </thead>
            <tbody>
              {attendance &&
                attendance.map((entry, index) => {
                  const { dateStr, timeStr } = formatDateAndTime(entry.time);

                  return (
                    <tr key={entry.id}>
                      <td>{timeStr}</td>
                      <td>{dateStr}</td>
                      <td>{formatTime(entry.entryTime)}</td>
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
