import "./UserDetails.css";
import React, { useEffect, useState } from "react";
// import userImg from "../../assets/user-image-cartoon.png";
import userImg from "../../assets/placeholder-man.jpeg";
// import userImg from "../../assets/user-placeholder-blueish.webp";
import sduLogo from "/logo_sdu.png";
import useSignout from "../../hooks/useSignout";
import { useAuthContext } from "../../context/AuthContext";
import { formatDate } from "../../utils";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState("");
  const signout = useSignout();
  const { user } = useAuthContext();

  const token = localStorage.getItem("token")?.replace(/"/g, "");
  const url = `https://attendancesystem-qpr5.onrender.com/api/v1/${user.role.toLowerCase()}`;

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        });
        console.log(res);
        if (res.ok) {
          const data = await res.json();
          setUserDetails(data);
        } else {
          console.error("Failed to fetch courses:", res.statusText);
        }
      } catch (error) {
        console.error("Error occurred while fetching courses:", error);
      }
    };

    getUserDetails();
  }, [token]);

  console.log(userDetails);

  const birthDate = formatDate(userDetails.birthDate);

  return (
    <div className="user-details">
      <img className="sdu-logo" src={sduLogo} alt="sdu logo" width={100} />
      <div className="user-info">
        <img className="user-profile-pic" src={userImg} alt="profile-pic" />
        <div>
          <div>
            <h3>Name</h3>
            <div>{userDetails.name + " " + userDetails.surname}</div>
          </div>
          <dir>
            <h3>Birth Date</h3>
            <div>{birthDate}</div>
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
