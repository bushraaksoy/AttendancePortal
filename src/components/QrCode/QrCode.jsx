import React, { useEffect, useState } from "react";
import "./QrCode.css";
import yes from "/delete.png";

const QrCode = ({ visible, setVisible, qrImage }) => {
  //   const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  const handleContainerClick = () => {
    setVisible(false);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`qr-container ${!visible ? "hide" : " "}`}
      onClick={handleContainerClick}
    >
      <div className="qr-image-container">
        <div className="close-button" onClick={handleContainerClick}>
          X
        </div>
        <img
          className="qr-image"
          src={qrImage}
          alt="QR Code"
          onClick={handleImageClick}
        />
      </div>
    </div>
  );
};

export default QrCode;

//loading gif
// https://i.gifer.com/ZKZg.gif
