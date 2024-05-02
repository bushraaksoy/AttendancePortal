import React, { useState } from "react";
import MainLayout from "../MainLayout/MainLayout";
import CoursesTable from "../CoursesTable/CoursesTable";
import useFetch from "../../Hooks/useFetch";
import { useParams } from "react-router-dom";

const Permissions = () => {
  const { courseId, courseGroup } = useParams();
  const [group, setGroup] = useState("");
  const authResult = new URLSearchParams(window.location.search); // for query search params

  // const url = `/student/courses/${courseId}/${group}/students`;
  const url = `/student/courses/${courseId}/${courseGroup}/students`;
  const {
    data: students,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });

  console.log("students in the same group: ", students);

  return (
    <MainLayout>
      <div className="prompt">
        You can give attendance permission to one student of your choice!
      </div>
      <h1>Permissions</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr id={student.userId}>
              <td>{`${student.name} ${student.surname}`}</td>
              <td>{student.email}</td>
              <td>
                <div className="view">Give Permission</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
};

export default Permissions;
