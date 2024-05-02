import React, { useState } from "react";
import "./Permissions.css";
import MainLayout from "../MainLayout/MainLayout";
import CoursesTable from "../CoursesTable/CoursesTable";
import useFetch from "../../Hooks/useFetch";
import { useParams } from "react-router-dom";

const Permissions = () => {
  const { courseId, courseGroup } = useParams();
  const authResult = new URLSearchParams(window.location.search); // for query search params
  const [student, setStudent] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const url = `/student/courses/${courseId}/${courseGroup}/students`;
  const {
    data: students,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });

  const handleGivePermissionClick = () => {
    setIsVisible(true);
  };

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
          {students &&
            students.map((student) => (
              <tr id={student.userId}>
                <td>{`${student.name} ${student.surname}`}</td>
                <td>{student.email}</td>
                <td>
                  <div className="view" onClick={handleGivePermissionClick}>
                    Give Permission
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ConfirmPermission
        visible={isVisible}
        setVisible={setIsVisible}
        student={student}
      />
    </MainLayout>
  );
};

export default Permissions;

const ConfirmPermission = ({ student, visible, setVisible }) => {
  const handleContainerClick = () => {
    setVisible(false);
  };

  const handleDialogueClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`confirm-permission-popup ${!visible ? "hide" : " "}`}
      onClick={handleContainerClick}
    >
      <div className="confirmation-dialogue" onClick={handleDialogueClick}>
        <h3>Confirmation</h3>
        <div className="message">
          Are you sure you want to give permission to {student} for your
          attendance?
        </div>
        <div className="buttons">
          <button>Confirm</button>
          <button onClick={handleContainerClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
