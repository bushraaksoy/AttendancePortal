import { useState } from "react";
import "./QrCodeGenerator.css";
import QRCode from "react-qr-code";
import { v4 as uuidv4 } from "uuid";
const TeacherQrCode = () => {
  const generateUniqueToken = () => {
    const uniqueToken = uuidv4();

    return uniqueToken;
  };

  const [courseId, setCourseId] = useState("CSS 105");
  const [courseSection, setCourseSection] = useState("05-P");
  const [startTime, setStartTime] = useState("9:00");

  const uniqueToken = generateUniqueToken();

  const url = "https://e2zqvvi3635myzyqlr5el7lzpi.srv.us";
  const localhostUrl = "http://localhost:3000";

  const attendanceURL = `${localhostUrl}/confirm-attendance?token=${uniqueToken}&courseId=${courseId}&courseSection=${courseSection}&startTime=${startTime}`;

  return (
    <>
      <h1>Teacher generated QR code</h1>
      <form className="qr-class-form">
        <input
          type="text"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course Section"
          value={courseSection}
          onChange={(e) => setCourseSection(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <button>Generate QR</button>
      </form>
      <QRCode value={attendanceURL} size={300} />
    </>
  );
};

export default TeacherQrCode;
