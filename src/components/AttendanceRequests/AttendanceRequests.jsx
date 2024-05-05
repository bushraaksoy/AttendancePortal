import React, { useEffect, useState } from "react";
import "./AttendanceRequests.css";
import { AdminLayout } from "../../components";
import yes from "/correct.png";
import no from "/delete.png";
import useFetch from "../../hooks/useFetch";
import { formatDateAndTime } from "../../utils";
import { toast } from "react-toastify";

const AttendanceRequests = () => {
  const [tooltipVisibility, setTooltipVisibility] = useState({});
  const token = localStorage.getItem("token")?.replace(/\"/g, "");
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  const handleClick = async (attendanceId, action) => {
    const acceptUrl = `${API_BASE_URL}/admin/attendance/${attendanceId}/appeals/${action}`;
    const res = await fetch(acceptUrl, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const errorData = await response.json(); // Assuming server sends JSON error details
      toast.error(`${action} was not successful!`);
      throw new Error(errorData.message || `${action} was not successful!`); // Throw an error with the message from the server
    }

    toast.success(`${action} was successful!`);
  };

  const url = `/admin/absence_reasons`;
  const {
    data: requests,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });

  console.log("Absense reasons: ", requests);

  const toggleTooltip = (id) => {
    setTooltipVisibility((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <AdminLayout>
      <>
        <h2>Attendance Requests</h2>
        <div className="prompt">Click on the explanation to read more!</div>
        <table className="table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Course code</th>
              <th>Group</th>
              <th>Date</th>
              <th>Time</th>
              <th>Explanation</th>
              <th>Document</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests &&
              requests.map((request) => {
                const { dateStr, timeStr } = formatDateAndTime(
                  request.requestedDate
                );
                console.log(dateStr, timeStr);
                return (
                  <tr key={request.attendance_record_id}>
                    <td>{request.student}</td>
                    <td>{request.course_code}</td>
                    <td>{request.group}</td>
                    <td>{dateStr}</td>
                    <td>{timeStr}</td>
                    <td
                      onClick={() =>
                        toggleTooltip(request.attendance_record_id)
                      }
                    >
                      <CustomTooltip
                        content={request.reason}
                        isVisible={
                          tooltipVisibility[request.attendance_record_id] ||
                          false
                        }
                      >
                        <div className="request-explanation">
                          {request.reason}
                        </div>
                      </CustomTooltip>
                    </td>
                    <td>
                      <a href={request.file_path}>View Document</a>
                    </td>
                    <td className="action">
                      <img
                        className={
                          request.status === "APPROVED" ? "active" : ""
                        }
                        onClick={() => {
                          handleClick(request.attendance_record_id, "accept");
                        }}
                        src={yes}
                        alt="Approve Request"
                        title="Approve Request"
                      />
                      <img
                        className={request.status === "DENIED" ? "active" : ""}
                        onClick={() => {
                          handleClick(request.attendance_record_id, "deny");
                        }}
                        src={no}
                        alt="Deny Request"
                        title="Deny Request"
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
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
