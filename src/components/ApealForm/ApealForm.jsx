import React from "react";
import "./ApealForm.css";

const ApealForm = ({ visible }) => {
  return (
    <div className={`apeal-popup ${!visible ? "hide" : ""}`}>
      <form className="apeal-form">
        <input type="text" placeholder="" />
        <input type="text" />
      </form>
    </div>
  );
};

export default ApealForm;
