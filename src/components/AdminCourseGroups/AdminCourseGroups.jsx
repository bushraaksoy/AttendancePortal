import React from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import { formatTime } from "../../utils";
import useFetch from "../../hooks/useFetch";

const AdminCourseGroups = () => {
  const authResult = new URLSearchParams(window.location.search);
  const courseCode = authResult.get("code");
  const courseName = authResult.get("name");

  const url = "/admin/courses/1/lessons";
  const {
    data: lessons,
    loading,
    error,
  } = useFetch(url, {
    method: "GET",
    headers: {},
  });

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
            </tr>
          </thead>
          <tbody>
            {lessons &&
              lessons.map((lesson) => (
                <tr>
                  <td>{courseCode}</td>
                  <td>{lesson.group}</td>
                  <td>{lesson.dayOfWeek}</td>
                  <td>{formatTime(lesson.startTime)}</td>
                  <td>{lesson.teacher}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    </AdminLayout>
  );
};

export default AdminCourseGroups;
