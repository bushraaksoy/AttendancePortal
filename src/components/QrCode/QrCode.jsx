import React, { useEffect, useState } from "react";
import "./QrCode.css";

const QrCode = ({ visible, qrImage }) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible, qrImage]);

  const handleContainerClick = () => {
    setIsVisible(false);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`qr-container ${!isVisible ? "hide" : " "}`}
      onClick={handleContainerClick}
    >
      <img
        className="qr-image"
        src={qrImage}
        alt="QR Code"
        onClick={handleImageClick}
      />
    </div>
  );
};

export default QrCode;
