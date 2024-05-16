import React from "react";
import "./CourseGroups.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import MainLayout from "../MainLayout/MainLayout";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { useAuthContext } from "../../context/AuthContext";
import { formatTime } from "../../utils";
import Loader from "../Loader";

const CourseGroups = () => {
  const { courseId } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const authResult = new URLSearchParams(window.location.search);
  const courseCode = authResult.get("code");
  const courseName = authResult.get("name");

  const url = `/${user.role.toLowerCase()}/courses/${courseId}/lessons`;
  const {
    data: lessons,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });

  const handleTakeClick = (id) => {
    console.log("Take Clicked for:", id);
    // logic for taking attendance here
  };

  console.log(`Lessons for ${courseCode}: `, lessons);

  if (loading)
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );

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
              {user.role == "STUDENT" ? <th>Permissions</th> : <></>}
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
                      <Link
                        className="view"
                        to={`/${courseId}/${lesson.group}/permissions?code=${courseCode}`}
                      >
                        View
                      </Link>
                    </td>
                  ) : (
                    <></>
                  )}
                  <td>
                    {user.role == "STUDENT" ? (
                      <Link
                        className="view"
                        to={`/${courseId}/${lesson.group}/attendance?code=${courseCode}&name=${courseName}&id=${courseId}`}
                      >
                        View
                      </Link>
                    ) : (
                      <>
                        <Link
                          to={`/${courseId}/${lesson.group}/students?name=${courseName}&code=${courseCode}`}
                        >
                          <button
                            title="View lesson attendance records"
                            className="icon-button eye"
                          >
                            <FaEye size={"14px"} />
                          </button>
                        </Link>
                        <span></span>
                        <Link
                          to={`/${courseId}/${lesson.group}/take-attendance?code=${courseCode}&name=${courseName}$lessonId=${lesson.id}`}
                        >
                          <button
                            title="Take attendance for lesson"
                            onClick={() => handleTakeClick(lesson.id)}
                            className="icon-button pencil"
                          >
                            <FaPencilAlt size={"14px"} />
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
