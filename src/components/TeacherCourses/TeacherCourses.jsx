import React from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import useFetch from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";

const TeacherCourses = () => {
  const authResult = new URLSearchParams(window.location.search);
  const teacherName = authResult.get("name");
  const teacherId = useParams("teacherId");
  const navigate = useNavigate();

  console.log(teacherId);
  const url = `/admin/teachers/${teacherId.teacherId}/courses`;

  const {
    data: courses,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });

  if (loading)
    return (
      <AdminLayout>
        <img width={50} src="https://i.gifer.com/ZKZg.gif" />
      </AdminLayout>
    );
  console.log(courses);

  return (
    <AdminLayout>
      <>
        <div className="prompt">View courses of teacher!</div>
        <h2>{teacherName}</h2>
        <table className="table hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Code</th>
              <th>Name</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {courses &&
              courses.map((course) => (
                <tr
                  key={course.id}
                  onClick={() =>
                    navigate(
                      `/all-courses/${course.id}/groups?code=${course.code}&name=${course.name}`
                    )
                  }
                >
                  <td>{course.id}</td>
                  <td>{course.code}</td>
                  <td>{course.name}</td>
                  <td>{course.total_hours}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    </AdminLayout>
  );
};

export default TeacherCourses;
