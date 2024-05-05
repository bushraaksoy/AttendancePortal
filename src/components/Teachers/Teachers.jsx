import React from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import useFetch from "../../hooks/useFetch";
import { formatDate } from "../../utils";

const Teachers = () => {
  const url = "/admin/teachers";
  const {
    data: teachers,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });
  return (
    <AdminLayout>
      <>
        <div className="prompt">Click on a teacher to view their courses!</div>
        <h2>Teachers</h2>
        <table className="table hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Birth date</th>
            </tr>
          </thead>
          <tbody>
            {teachers &&
              teachers.map((teacher) => (
                <tr key={teacher.userId}>
                  <td>{`${teacher.name} ${teacher.surname}`}</td>
                  <td>{teacher.email}</td>
                  <td>{formatDate(teacher.birthDate)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    </AdminLayout>
  );
};

export default Teachers;
