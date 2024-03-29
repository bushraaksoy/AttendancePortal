import React from "react";
import "./MainLayout.css";
import UserDetails from "../UserDetails/UserDetails";

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <UserDetails />
      {children}
    </div>
  );
};

export default MainLayout;
