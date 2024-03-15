import "./UserDetails.css";
import React, { useContext } from "react";
import user from "../../assets/user-image-cartoon.png";
import sduLogo from "/logo_sdu.png";
import { LoginContext } from "../../Context/LoginContext";
import useToast from "../../Hooks/useToast";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const navigate = useNavigate();
  const { setIsAuth, setToken } = useContext(LoginContext);

  const signout = () => {
    setToken("");
    setIsAuth(false);
    navigate("/login");
    useToast("Signed out successfully", "success");
    console.log("successful signout");
  };
  return (
    <div className="user-details">
      <img src={sduLogo} alt="sdu logo" width={100} />
      <div className="user-info">
        <img className="user-profile-pic" src={user} alt="profile-pic" />
        <div>
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
      <button className="signout-btn" onClick={signout}>
        Sign out
      </button>
    </div>
  );
};

export default UserDetails;
