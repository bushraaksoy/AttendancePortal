import { useState } from "react";
import "./ConfirmAttendance.css";
import { toast, useToast } from "react-toastify";

const ConfirmAttendance = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const [courseId, setCourseId] = useState(urlParams.get("courseId"));
  const [courseSection, setCourseSection] = useState(
    urlParams.get("courseSection")
  );
  const [startTime, setStartTime] = useState(urlParams.get("startTime"));
  const [studentId, setStudentId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      courseId,
      courseSection,
      startTime,
      studentId,
    };

    const url = "https://fdft7dwv7wwszgnccr5x522sw4.srv.us";
    const localhostUrl = "http://localhost:3002";

    const res = await fetch(`${localhostUrl}/attendance`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast("Failed to mark attendance", { type: "error" });
      throw new Error("Failed to POST");
    }

    toast("Attendance Marked Sucessfully", { type: "success" });
    resetForm();
  };

  const resetForm = () => {
    setCourseId("");
    setCourseSection("");
    setStartTime("");
    setStudentId("");
  };

  return (
    <form onSubmit={handleSubmit} className="confirm-attendance-form">
      <label htmlFor="course-id">
        <input
          type="text"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
      </label>
      <label htmlFor="course-section">
        <input
          type="text"
          placeholder="Course Section"
          value={courseSection}
          onChange={(e) => setCourseSection(e.target.value)}
        />
      </label>
      <label htmlFor="start-time">
        <input
          type="text"
          placeholder="Starting time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </label>
      <label htmlFor="student-id">
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </label>
      <button>Confirm Attendance</button>
    </form>
  );
};

export default ConfirmAttendance;
