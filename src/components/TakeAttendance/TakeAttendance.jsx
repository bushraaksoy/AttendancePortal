import React, { useState } from "react";
import MainLayout from "../MainLayout/MainLayout";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { formatDateAndTime } from "../../utils";
import QrCode from "../QrCode/QrCode";
const TakeAttendance = () => {
  const { courseId, courseGroup } = useParams();
  const authResult = new URLSearchParams(window.location.search);
  const courseCode = authResult.get("code");
  const courseName = authResult.get("name");
  const lessonId = authResult.get("lessonId");

  const [qrImage, setQrImage] = useState("");
  const token = localStorage.getItem("token")?.replace(/"/g, "");
  const [qrIsVisible, setQrIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const url = `/teacher/attendance/take/courses/${courseId}/${courseGroup}`;
  const {
    data: attendance,
    loading2,
    error2,
  } = useFetch(url, { method: "GET", headers: {} });

  const generateQrCode = async (lessonId, attendanceId) => {
    setQrIsVisible(true);
    setLoading(true);
    console.log(qrIsVisible);
    lessonId = 3;
    console.log(`lessonId: ${lessonId}, attendanceId: ${attendanceId}`);
    const urlQr =
      "https://attendancesystem-qpr5.onrender.com/api/v1/teacher/attendance/take/qr";
    try {
      const response = await fetch(urlQr, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lessonId: lessonId,
          attendanceId: attendanceId,
        }),
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }
      const data = await response.blob();
      setQrImage(URL.createObjectURL(data));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching QR code:", err);
    }
  };

  return (
    <MainLayout>
      <>
        <h2>Take Attendance</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Group</th>
              <th>Time</th>
              <th>Date</th>
              <th>QR</th>
            </tr>
          </thead>
          <tbody>
            {attendance &&
              attendance.map((entry) => {
                const { dateStr, timeStr } = formatDateAndTime(
                  entry.localDateTime
                );
                return (
                  <tr key={entry.id}>
                    <td>{courseCode}</td>
                    <td>{courseGroup}</td>
                    <td>{timeStr}</td>
                    <td>{dateStr}</td>
                    <td>
                      <div
                        onClick={() => generateQrCode(lessonId, entry.id)}
                        className="view"
                      >
                        Generate
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <QrCode
          visible={qrIsVisible}
          setVisible={setQrIsVisible}
          qrImage={
            loading
              ? "https://assets-v2.lottiefiles.com/a/773c6c28-1170-11ee-a2b3-1b70cb950de9/Cw0hAVusK0.gif"
              : qrImage
          }
        />
      </>
    </MainLayout>
  );
};

export default TakeAttendance;

//   ? "https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif"
// ? "https://assets-v2.lottiefiles.com/a/773c6c28-1170-11ee-a2b3-1b70cb950de9/Cw0hAVusK0.gif"
// below is the interesting loader
// ? "https://64.media.tumblr.com/c37398622c6e09e3c6ed2fad980b469e/tumblr_mzti8ldcVX1svwlszo1_500.gif"
