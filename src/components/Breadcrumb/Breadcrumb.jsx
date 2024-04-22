import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import "./Breadcrumbs.css";

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="breadcrumb">
      {breadcrumbs.map(({ breadcrumb, match }, index) => (
        <span key={index}>
          <a href={match.url}>{breadcrumb}</a>
          {index < breadcrumbs.length - 1 && " > "}{" "}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
