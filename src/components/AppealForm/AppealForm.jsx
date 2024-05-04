import React, { useState, useRef } from "react";
import "./AppealForm.css";
import { MdDelete } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";

const AppealForm = ({ visible, setVisible, attendance }) => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [reason, setReason] = useState("");
  const token = localStorage.getItem("token")?.replace(/"/g, "");

  const { attendanceId, courseCode, courseGroup, dateStr, timeStr } =
    attendance || {};

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  const handleDeleteFile = () => {
    setFile(null);
    // Reset the value of the file input to remove the file name from the input field
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleContainerClick = () => {
    setVisible(false);
  };

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  const handleSubmitApeal = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("reason", reason);

    const appealUrl = `https://attendancesystem-qpr5.onrender.com/api/v1/student/attendance/${attendanceId}/appeals`;
    try {
      const res = await fetch(appealUrl, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.log("res: ", res);
        toast.error(res.text());
        throw new Error("Unsuccessful apeal!");
      }

      setVisible(false);
      toast.success("Your apeal was sent successfully!");
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error("Failed to send apeal.");
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className={`appeal-popup ${!visible ? "hide" : ""}`}
    >
      <div className="popup-window" onClick={handleFormClick}>
        <div className="close-button" onClick={handleContainerClick}>
          X
        </div>
        <form className="appeal-form">
          <h1>Appeal for Attendance</h1>
          <input
            type="text"
            placeholder="Course Code"
            value={courseCode || ""}
            readOnly
          />
          <input
            type="text"
            placeholder="Section"
            value={courseGroup || ""}
            readOnly
          />
          <input
            type="text"
            placeholder="Time"
            value={timeStr || ""}
            readOnly
          />
          <input
            type="text"
            placeholder="Date"
            value={dateStr || ""}
            readOnly
          />
          <textarea
            placeholder="Explain the reason for your absence."
            className="text-area"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
            }}
          ></textarea>

          <div className="file-div">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="file-input"
              onChange={handleFileChange}
            />
            {file && (
              <div className="file-info">
                <div onClick={handleDeleteFile} className="delete-button">
                  <MdDelete size={"2em"} />
                </div>
              </div>
            )}
          </div>
          <span className="pdf-prompt">Choose a PDF file only</span>

          <div className="sent-button-div">
            <button
              onClick={handleSubmitApeal}
              type="button"
              className="send-button"
            >
              {/* <IoSend /> */}
              Submit Appeal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppealForm;
