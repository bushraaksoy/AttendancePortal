import React, { useEffect, useState } from "react";
import "./AttendanceRequests.css";
import { AdminLayout } from "../../components";
import yes from "/correct.png";
import no from "/delete.png";
import useFetch from "../../hooks/useFetch";

const AttendanceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [approvalStatus, setApprovalStatus] = useState({});
  const [tooltipVisibility, setTooltipVisibility] = useState({});

  const handleApproval = (id, status) => {
    setApprovalStatus((prevStatus) => ({ ...prevStatus, [id]: status }));
  };

  const handleAcceptClick = (attendanceId) => {
    const acceptUrl = `/admin/attendance/${attendanceId}/appeals/accept`;
  };

  const handleDenyClick = (attendanceId) => {
    const denyUrl = `/admin/attendance/${attendanceId}/appeals/deny`;
  };

  const url = `/admin/absence_reasons`;
  const {
    data: AttendanceRequests,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });

  console.log("Absense reasons: ", AttendanceRequests);

  useEffect(() => {
    const getRequests = async () => {
      const res = await fetch("http://localhost:3002/requests");
      const data = await res.json();
      setRequests(data);
    };
    getRequests();
  }, []);

  const toggleTooltip = (id) => {
    setTooltipVisibility((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <AdminLayout>
      <div className="course-info">
        <h2>Attendance Requests</h2>
        <div className="prompt">Click on the explanation to read more!</div>
        <table className="table">
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
                {/* <td className="request-explanation">{request.explanation}</td> */}
                <td onClick={() => toggleTooltip(request.id)}>
                  <CustomTooltip
                    content={request.explanation}
                    isVisible={tooltipVisibility[request.id] || false}
                  >
                    <div className="request-explanation">
                      {request.explanation}
                    </div>
                  </CustomTooltip>
                </td>
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

const CustomTooltip = ({ children, content, isVisible }) => {
  return (
    <div className="tooltip-container">
      {children}
      {isVisible && (
        <>
          <div className="tooltip-arrow"></div>
          <div className="tooltip-content">{content}</div>
        </>
      )}
    </div>
  );
};
