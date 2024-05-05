import React from "react";
import MainLayout from "../MainLayout/MainLayout";
import { formatDate } from "../../utils";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Students = () => {
  const { courseId, courseGroup } = useParams();
  const navigate = useNavigate();

  const authResult = new URLSearchParams(window.location.search);
  const courseCode = authResult.get("code");
  const courseName = authResult.get("name");

  const {
    data: students,
    loading,
    error,
  } = useFetch(`/teacher/courses/${courseId}/${courseGroup}/students`, {
    method: "GET",
    headers: {},
  });
  console.log("students", students);
  // name surname, email, birthdate
  return (
    <MainLayout>
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
                  onClick={() => {
                    navigate(
                      `/${courseId}/${courseGroup}/attendance?name=${courseName}&code=${courseCode}&studentId=${student.userId}`
                    );
                  }}
                >
                  <td>{`${student.name} ${student.surname}`}</td>
                  <td>{student.email}</td>
                  <td>{formatDate(student.birthDate)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    </MainLayout>
  );
};

export default Students;
