import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../CoursesTable/CoursesTable.css";
import { useAuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import MainLayout from "../MainLayout/MainLayout";
import AppealForm from "../AppealForm/AppealForm";
import { formatDateAndTime } from "../../utils";

const CourseAttendanceTable2 = () => {
  const authResult = new URLSearchParams(window.location.search);
  const courseCode = authResult.get("code");
  const courseName = authResult.get("name");

  const { courseId, courseGroup } = useParams();
  const { user } = useAuthContext();
  const url =
    user.role == "STUDENT"
      ? `/${user.role.toLowerCase()}/attendance/courses/${courseId}/${courseGroup}`
      : `/teacher/attendance/courses/${courseId}/${courseGroup}/students/${authResult.get(
          "studentId"
        )}`;

  const [selectedEntry, setSelectedEntry] = useState(null); // stores the selected attendance entry for apeal

  const {
    data: attendance,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });

  const [isVisible, setIsVisible] = useState(false);
  const handleAppealClick = (entry) => {
    setIsVisible(true);
    setSelectedEntry(entry);
  };

  if (loading)
    return (
      <MainLayout>
        <img width={50} src="https://i.gifer.com/ZKZg.gif" />
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
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Code</th>
                <th>Section</th>
                <th>Time</th>
                <th>Date</th>
                <th>Method</th>
                <th>Attended</th>
                <th>Attendance By</th>
                {user.role == "TEACHER" ? <></> : <th></th>}
              </tr>
            </thead>
            <tbody>
              {attendance.map((entry, index) => {
                const { dateStr, timeStr } = formatDateAndTime(entry.time);
                const courseGroup = entry.courseGroup;
                const attendanceId = entry.id;
                return (
                  <tr key={entry.id}>
                    <td>{entry.student}</td>
                    <td>{courseCode}</td>
                    <td>{entry.courseGroup}</td>
                    <td>{timeStr}</td>
                    <td>{dateStr}</td>
                    <td>
                      <div
                        className={
                          "text " +
                            (entry.attendanceType &&
                              entry.attendanceType.toLowerCase()) || "no-method"
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
                    {user.role == "TEACHER" ? (
                      <></>
                    ) : (
                      <td>
                        {entry.attendanceStatus === "ABSENT" && (
                          <div
                            onClick={() =>
                              handleAppealClick({
                                attendanceId,
                                courseCode,
                                courseGroup,
                                dateStr,
                                timeStr,
                              })
                            }
                            className="apeal"
                          >
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
        <AppealForm
          visible={isVisible}
          setVisible={setIsVisible}
          attendance={selectedEntry}
        />
      </>
    </MainLayout>
  );
};

export default CourseAttendanceTable2;
