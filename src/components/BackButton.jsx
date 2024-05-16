import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button className="back-button" onClick={goBack}>
      <FaArrowLeft />
    </button>
  );
};

export default BackButton;
