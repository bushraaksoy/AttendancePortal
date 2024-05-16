import React, { useEffect, useState } from "react";
import "./Permissions.css";
import MainLayout from "../MainLayout/MainLayout";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader";

const Permissions = () => {
  const { courseId, courseGroup } = useParams();
  const [student, setStudent] = useState(null);
  const [permittedStudent, setPermittedStudent] = useState(null);
  const token = localStorage.getItem("token")?.replace(/"/g, "");

  const studentsUrl = `/student/courses/${courseId}/consumers`;
  const [isVisible, setIsVisible] = useState(false);

  const url = `/student/courses/${courseId}/${courseGroup}/students`;
  const {
    data: permittedStudents,
    loading2,
    error2,
  } = useFetch(studentsUrl, { method: "GET", headers: {} });

  useEffect(() => {
    setPermittedStudent(permittedStudents && permittedStudents[0]);
  }, [permittedStudents]);

  const {
    data: students,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });

  const handleGivePermissionClick = (student) => {
    setIsVisible(true);
    setStudent(student);
  };

  const handleContainerClick = () => {
    setIsVisible(false);
  };

  const handleDialogueClick = (e) => {
    e.stopPropagation();
  };

  const handleConfirmClick = async () => {
    const permissionUrl = `https://attendancesystem-qpr5.onrender.com/api/v1/student/attendance/courses/${courseId}/${courseGroup}/students/${student.userId}/give-access`;
    try {
      const res = await fetch(permissionUrl, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.log(res);
        toast.error(res.text());
        throw new Error("Unsuccessful permission granting!");
      }

      setIsVisible(false);
      toast.success("Permission was given successfully!");
    } catch (error) {
      console.error("Error giving permission:", error);
      toast.error("You have already given permission to another student.");
    }
  };

  if (loading || loading2) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="prompt">
        You can give attendance permission to one student of your choice!
      </div>
      <h1>Permissions</h1>
      <div className="permitted-message">
        <span style={{ fontWeight: "700" }}>
          {permittedStudent &&
            `${permittedStudent.name} ${permittedStudent.surname}  `}
        </span>
        has permission to take your attendance
      </div>
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
              <tr key={student.userId} id={student.userId}>
                <td>{`${student.name} ${student.surname}`}</td>
                <td>{student.email}</td>
                <td>
                  <div
                    className={student ? "view disabled" : "view"}
                    onClick={() => {
                      handleGivePermissionClick(student);
                    }}
                  >
                    Give Permission
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div
        className={`confirm-permission-popup ${!isVisible ? "hide" : " "}`}
        onClick={handleContainerClick}
      >
        <div className="confirmation-dialogue" onClick={handleDialogueClick}>
          {permittedStudent ? (
            <>
              <div className="message">
                You have already permitted
                {` ${permittedStudent.name} ${permittedStudent.surname} for taking your attendance `}
              </div>
              <button onClick={handleContainerClick}>Cancel</button>
            </>
          ) : (
            <>
              <h3>Confirmation</h3>
              <div className="message">
                Are you sure you want to give permission to{" "}
                <span style={{ fontWeight: "700" }}>
                  {student && `${student.name} ${student.surname}`}
                </span>{" "}
                to take your attendance?
              </div>
              <div className="buttons">
                <button onClick={handleConfirmClick}>Confirm</button>
                <button onClick={handleContainerClick}>Cancel</button>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Permissions;
