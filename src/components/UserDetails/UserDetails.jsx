import "./UserDetails.css";
import React from "react";
import user from "../../assets/profile-student.webp";
import sduLogo from "/logo_sdu.png";

const UserDetails = () => {
  return (
    <div className="user-details">
      <img src={sduLogo} alt="sdu logo" width={100} />
      <div className="user-info">
        <img className="user-profile-pic" src={user} alt="profile-pic" />
        <div>
          <h3>Name</h3>
          <div>Bushra Alptekin Aksoy</div>
        </div>
        <dir>
          <h3>Faculty</h3>
          <div>Engineering and Natural Sciences</div>
        </dir>
        <div>
          <h3>Department</h3>
          <div>Computer Science</div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
