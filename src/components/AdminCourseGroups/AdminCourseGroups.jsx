import React from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import { formatTime } from "../../utils";
import useFetch from "../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader";

const AdminCourseGroups = () => {
  const authResult = new URLSearchParams(window.location.search);
  const courseCode = authResult.get("code");
  const courseName = authResult.get("name");
  const { courseId } = useParams();

  const url = `/admin/courses/${courseId}/lessons`;
  const {
    data: lessons,
    loading,
    error,
  } = useFetch(url, {
    method: "GET",
    headers: {},
  });

  if (loading)
    return (
      <AdminLayout>
        <Loader />
      </AdminLayout>
    );

  return (
    <AdminLayout>
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
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {lessons &&
              lessons.map((lesson, inx) => (
                <tr key={inx}>
                  <td>{courseCode}</td>
                  <td>{lesson.group}</td>
                  <td>{lesson.dayOfWeek}</td>
                  <td>{formatTime(lesson.startTime)}</td>
                  <td>{lesson.teacher}</td>
                  <td>
                    <Link
                      className="view"
                      to={`/all-courses/${courseId}/${lesson.group}/students?name=${courseName}&code=${courseCode}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    </AdminLayout>
  );
};

export default AdminCourseGroups;
