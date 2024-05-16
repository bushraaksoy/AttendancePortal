import "./UserDetails.css";
import React, { useEffect, useState } from "react";
// import userImg from "../../assets/user-image-cartoon.png";
import userImg from "../../assets/placeholder-man.jpeg";
// import userImg from "../../assets/user-placeholder-blueish.webp";
import sduLogo from "/logo_sdu.png";
import useSignout from "../../hooks/useSignout";
import { useAuthContext } from "../../context/AuthContext";
import { formatDate } from "../../utils";
import useFetch from "../../hooks/useFetch";

const UserDetails = () => {
  const signout = useSignout();
  const { user } = useAuthContext();

  const token = localStorage.getItem("token")?.replace(/"/g, "");
  const url = `/${user.role.toLowerCase()}`;

  const {
    data: userDetails,
    loading,
    error,
  } = useFetch(url, { method: "GET", headers: {} });

  console.log(userDetails);

  return (
    <div className="user-details">
      <img className="sdu-logo" src={sduLogo} alt="sdu logo" width={100} />

      <div className="user-info">
        <img className="user-profile-pic" src={userImg} alt="profile-pic" />
        <div>
          <div>
            <h3>Name</h3>
            <div>
              {loading
                ? "Name Surname..."
                : userDetails.name + " " + userDetails.surname}
            </div>
          </div>
          <dir>
            <h3>Birth Date</h3>
            <div>
              {loading ? "Birthdate..." : formatDate(userDetails.birthDate)}
            </div>
          </dir>
          <div>
            <h3>Department</h3>
            <div>Computer Science</div>
          </div>
        </div>
      </div>
      <button
        className="signout-btn"
        onClick={() => {
          signout();
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default UserDetails;
