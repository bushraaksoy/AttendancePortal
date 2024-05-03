import React, { useState } from "react";
import "./ApealForm.css";
import { MdCloudUpload, MdDelete, MdPictureAsPdf } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { AiFillFileImage } from "react-icons/ai";

const ApealForm = ({ visible, setVisible }) => {
  const [fileName, setFileName] = useState("No selected file");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
    } else {
      setFileName("No selected file");
    }
  };

  const handleDeleteFile = () => {
    if (fileName !== "No selected file") {
      setFileName("No selected file");
    } else {
      alert("No file selected to delete.");
    }
  };

  const handleContainerClick = () => {
    setVisible(false);
  };

  const handleFormClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      onClick={handleContainerClick}
      className={`apeal-popup ${!visible ? "hide" : ""}`}
    >
      <div className="popup-window">
        <div className="close-button" onClick={handleContainerClick}>
          X
        </div>
        <form onClick={handleFormClick} className="apeal-form">
          <h1>Appeal for attendance</h1>

          <input type="text" placeholder="Course Code" />
          <input type="text" placeholder="Section" />
          <input type="text" placeholder="Time" />
          <input type="text" placeholder="Date" />
          <textarea
            placeholder="Explain the reason of your absence."
            className="text-area"
          ></textarea>

          <div className="file-div">
            <div className="row-file">
              <input
                type="file"
                accept=".pdf"
                className="input-field"
                onChange={handleFileChange}
              />

              {fileName !== "No selected file" && (
                <button
                  className="delete-button-container"
                  onClick={handleDeleteFile}
                >
                  <MdDelete className="delete-button" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          </div>
          <span>
            <p className="pdf-prompt">Choose a PDF file only</p>
          </span>

          <div className="sent-button-div">
            <button className="send-button">
              <IoSend />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApealForm;
