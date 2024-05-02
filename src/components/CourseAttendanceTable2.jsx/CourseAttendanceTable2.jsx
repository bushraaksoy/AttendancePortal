import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../CoursesTable/CoursesTable.css";
import { useAuthcontext } from "../../context/AuthContext";
import useFetch from "../../Hooks/useFetch";
import MainLayout from "../MainLayout/MainLayout";
import AppealForm from "../ApealForm/ApealForm";
import { formatDateAndTime } from "../../utils";

const CourseAttendanceTable2 = () => {
  const authResult = new URLSearchParams(window.location.search);

  const courseCode = authResult.get("code");
  const courseName = authResult.get("name");

  const { courseId, courseGroup } = useParams();
  const { user } = useAuthContext();
  const url = `/${user.role.toLowerCase()}/attendance/courses/${courseId}/${courseGroup}`;

  const {
    data: attendance,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });

  const [isVisible, setIsVisible] = useState(false);
  const handleAppealClick = () => {
    setIsVisible(true);
  };

  if (loading)
    return (
      <MainLayout>
        <div className="page-content">Loading...</div>
      </MainLayout>
    );

  console.log(attendance);

  return (
    <MainLayout>
      <>
        <div className="prompt">
          Select section to submit attendance or attendance request!
        </div>
        <h2>{courseName}</h2>
        <div className="table-div">
          <table className="courses-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Section</th>
                <th>Time</th>
                <th>Date</th>
                <th>Attended</th>
                {user.role == "TEACHER" ? <></> : <th></th>}
              </tr>
            </thead>
            <tbody>
              {attendance.map((entry, index) => {
                console.log(entry.time);
                const { dateStr, timeStr } = formatDateAndTime(entry.time);
                console.log("date ", dateStr);
                return (
                  <tr key={entry.id}>
                    <td>{courseCode}</td>
                    <td>{entry.courseGroup}</td>
                    <td>{timeStr}</td>
                    <td>{dateStr}</td>
                    <td>
                      <div
                        className={`text ${
                          entry.attendanceStatus === "PRESENT"
                            ? "attended"
                            : "absent"
                        }`}
                      >
                        {entry.attendanceStatus}
                      </div>
                    </td>
                    {user.role == "TEACHER" ? (
                      <></>
                    ) : (
                      <td>
                        {entry.attendanceStatus !== "PRESENT" && (
                          <div onClick={handleAppealClick} className="apeal">
                            Appeal
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <AppealForm visible={isVisible} />
      </>
    </MainLayout>
  );
};

export default CourseAttendanceTable2;

const TeacherTable = () => {
  return (
    <>
      <thead>
        <tr>
          <th>Code</th>
          <th>Section</th>
          <th>Time</th>
          <th>Date</th>
          <th>Attended</th>
        </tr>
      </thead>
      <tbody>
        {attendance.map((entry) => {
          const { dateStr, timeStr } = formatDateAndTime(entry.time);

          return (
            <tr key={entry.id}>
              <td>{courseCode}</td>
              <td>{entry.courseGroup}</td>
              <td>{timeStr}</td>
              <td>{dateStr}</td>
              <td>
                <div
                  className={`text ${
                    entry.attendanceStatus === "PRESENT" ? "attended" : "absent"
                  }`}
                >
                  {entry.attendanceStatus}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
};

const StudentTable = () => {
  <>
    <thead>
      <tr>
        <th>Code</th>
        <th>Section</th>
        <th>Time</th>
        <th>Date</th>
        <th>Attended</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {attendance.map((entry, index) => {
        console.log(entry.time);
        const { dateStr, timeStr } = formatDateAndTime(entry.time);
        console.log("date ", dateStr);
        return (
          <tr key={entry.id}>
            <td>{courseCode}</td>
            <td>{entry.courseGroup}</td>
            <td>{timeStr}</td>
            <td>{dateStr}</td>
            <td>
              <div
                className={`text ${
                  entry.attendanceStatus === "PRESENT" ? "attended" : "absent"
                }`}
              >
                {entry.attendanceStatus}
              </div>
            </td>
            <td>
              {entry.attendanceStatus !== "PRESENT" && (
                <div onClick={handleAppealClick} className="apeal">
                  Appeal
                </div>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </>;
};
