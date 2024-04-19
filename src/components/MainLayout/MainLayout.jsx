import React from "react";
import "./MainLayout.css";
import UserDetails from "../UserDetails/UserDetails";
import Breadcrumbs from "../Breadcrumb/Breadcrumb";

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <UserDetails />
      <div className="page-content">
        <div className="title">STUDENT PORTAL </div>
        <Breadcrumbs
          crumbs={[
            "Home",
            "Courses",
            "Software Architecture and Design Patterns",
          ]}
        />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
