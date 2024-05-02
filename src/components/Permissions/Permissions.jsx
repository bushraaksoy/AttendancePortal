import React from "react";
import MainLayout from "../MainLayout/MainLayout";
import CoursesTable from "../CoursesTable/CoursesTable";

const Permissions = () => {
  return (
    <MainLayout>
      <div className="prompt">
        You can give attendance permission to one student of your choice!
      </div>
      <h1>Permissions</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </MainLayout>
  );
};

export default Permissions;
