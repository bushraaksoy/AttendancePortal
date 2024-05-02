import React, { useEffect, useState } from "react";
import "./QrCode.css";

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
