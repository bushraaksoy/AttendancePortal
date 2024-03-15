import React, { useEffect, useState } from "react";
import "./AttendanceRequests.css";

const AttendanceRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      const res = await fetch("http://localhost:3002/requests");
      const data = await res.json();
      setRequests(data);
    };
    getRequests();
  }, []);

  return (
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
              <td>{request.explanation}</td>
              <td>
                <a href={request.documentUrl}>View Document</a>
              </td>
              <td>
                <button className="approve-btn">Approve</button>
                <button className="deny-btn">Deny</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceRequests;
