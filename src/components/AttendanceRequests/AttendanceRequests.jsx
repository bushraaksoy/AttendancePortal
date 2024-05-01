import React, { useEffect, useState } from "react";
import "./AttendanceRequests.css";
import { AdminLayout } from "../../components";
import yes from "/correct.png";
import no from "/delete.png";

const AttendanceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [approvalStatus, setApprovalStatus] = useState({});

  const handleApproval = (id, status) => {
    setApprovalStatus((prevStatus) => ({ ...prevStatus, [id]: status }));
  };

  useEffect(() => {
    const getRequests = async () => {
      const res = await fetch("http://localhost:3002/requests");
      const data = await res.json();
      setRequests(data);
    };
    getRequests();
  }, []);

  return (
    <AdminLayout>
      <div className="course-info">
        <table className="courses-table">
          <thead>
            <tr>
              <th></th>
              <th>Student ID</th>
              <th>Course ID</th>
              <th>Section</th>
              <th>Date</th>
              <th>Explanation</th>
              <th>Document</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.studentId}</td>
                <td>{request.courseId}</td>
                <td>{request.section}</td>
                <td>{request.date}</td>
                <td className="request-explanation">{request.explanation}</td>
                <td>
                  <a href={request.documentUrl}>View Document</a>
                </td>
                <td className="action">
                  <img
                    className={
                      approvalStatus[request.id] === "approved" ? "active" : ""
                    }
                    onClick={() => handleApproval(request.id, "approved")}
                    src={yes}
                    alt="Approve Request"
                    title="Approve Request"
                  />
                  <img
                    className={
                      approvalStatus[request.id] === "denied" ? "active" : ""
                    }
                    onClick={() => handleApproval(request.id, "denied")}
                    src={no}
                    alt="Deny Request"
                    title="Deny Request"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AttendanceRequests;
