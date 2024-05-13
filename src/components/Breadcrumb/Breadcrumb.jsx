import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import "./Breadcrumbs.css";

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  const styles = { color: "#40526c", fontWeight: "500" };

  return (
    <div className="breadcrumb">
      {breadcrumbs.map(({ breadcrumb, match }, index) => {
        console.log("match: ", match);
        console.log("breadcrumb: ", breadcrumb);
        return (
          <span
            style={index == breadcrumbs.length - 1 ? styles : {}}
            key={index}
          >
            <a href={match.pathname}>{breadcrumb}</a>
            {index < breadcrumbs.length - 1 && " > "}{" "}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
