import React from "react";
import "./CourseGroups.css";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import MainLayout from "../MainLayout/MainLayout";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { useAuthcontext } from "../../context/AuthContext";
import { formatTime } from "../../utils";

const CourseGroups = () => {
  const { courseId } = useParams();
  const { user } = useAuthContext();

  const authResult = new URLSearchParams(window.location.search);
  const courseCode = authResult.get("code");
  const courseName = authResult.get("name");

  const url = `/${user.role.toLowerCase()}/courses/${courseId}/lessons`;
  const {
    data: lessons,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });

  const handleViewClick = (id) => {
    console.log("View Clicked for:", id);
    // navigation logic or further actions here
  };

  const handleTakeClick = (id) => {
    console.log("Take Clicked for:", id);
    // logic for taking attendance here
  };

  console.log(`Lessons for ${courseCode}: `, lessons);
  return (
    <MainLayout>
      <>
        <div className="prompt">View course groups!</div>
        <h2>{courseName}</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Group</th>
              <th>Day</th>
              <th>Time</th>
              <th>Teacher</th>
              {user.role == "STUDENT" ? (
                <th>Permissions</th>
              ) : (
                <th>Students</th>
              )}
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {lessons &&
              lessons.map((lesson) => (
                <tr key={lesson.id}>
                  <td>
                    {user.role == "STUDENT" ? (
                      <Link
                        to={`/${courseId}/${lesson.group}/attendance?code=${courseCode}&name=${courseName}&id=${courseId}`}
                      >
                        {courseCode}
                      </Link>
                    ) : (
                      courseCode
                    )}
                  </td>
                  <td>{lesson.group}</td>
                  <td>{lesson.dayOfWeek}</td>
                  <td>{formatTime(lesson.startTime)}</td>
                  <td>{lesson.teacher}</td>
                  {user.role == "STUDENT" ? (
                    <td>
                      <div className="view">
                        <Link to={`/${courseId}/${lesson.group}/permissions`}>
                          view
                        </Link>
                      </div>
                    </td>
                  ) : (
                    <td>
                      <div className="view">view</div>
                    </td>
                  )}
                  <td>
                    {user.role == "STUDENT" ? (
                      <div className="view">
                        <Link
                          to={`/${courseId}/${lesson.group}/attendance?code=${courseCode}&name=${courseName}&id=${courseId}`}
                        >
                          view
                        </Link>
                      </div>
                    ) : (
                      <>
                        <Link
                          to={`/${courseId}/${lesson.group}/attendance?code=${courseCode}&name=${courseName}&id=${courseId}`}
                        >
                          <button
                            title="View lesson attendance records"
                            onClick={() => handleViewClick(lesson.id)}
                            className="icon-button eye"
                          >
                            <FaEye />
                          </button>
                        </Link>
                        <Link
                          to={`/${courseId}/${lesson.group}/take-attendance?code=${courseCode}&name=${courseName}$lessonId=${lesson.id}`}
                        >
                          <button
                            title="Take attendance for lesson"
                            onClick={() => handleTakeClick(lesson.id)}
                            className="icon-button pencil"
                          >
                            <FaPencilAlt />
                          </button>
                        </Link>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    </MainLayout>
  );
};

{
  /* <Link to={`/${lesson.id}/take-attendance`}> */
}

export default CourseGroups;
