import React from "react";
import { formatDate } from "../../utils";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AdminLayout from "../AdminLayout/AdminLayout";

const AdminStudents = () => {
  const { courseId, courseGroup } = useParams();
  const navigate = useNavigate();

  const authResult = new URLSearchParams(window.location.search);
  const courseCode = authResult.get("code");
  const courseName = authResult.get("name");

  const {
    data: students,
    loading,
    error,
  } = useFetch(`/admin/courses/${courseId}/${courseGroup}/students`, {
    method: "GET",
    headers: {},
  });
  console.log("students", students);

  return (
    <AdminLayout>
      {loading ? (
        <img width={50} src="https://i.gifer.com/ZKZg.gif" />
      ) : (
        <>
          <div className="prompt">
            Click on a student to view their attendance records!
          </div>
          <h2>Students</h2>
          <table className="table hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Birthdate</th>
              </tr>
            </thead>
            <tbody>
              {students &&
                students.map((student) => (
                  <tr
                    key={student.userId}
                    onClick={() =>
                      navigate(
                        `/all-courses/${courseId}/${courseGroup}/${student.userId}/attendance?code=${courseCode}&studentName=${student.name} ${student.surname}`
                      )
                    }
                  >
                    <td>{`${student.name} ${student.surname}`}</td>
                    <td>{student.email}</td>
                    <td>{formatDate(student.birthDate)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminStudents;
