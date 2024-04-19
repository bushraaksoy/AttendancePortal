import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import "./Breadcrumbs.css"; // Import your CSS file

// const Breadcrumbs = ({ crumbs }) => {
//   return (
//     <div className="breadcrumb">
//       {crumbs.map((crumb, index) => (
//         <span key={index}>
//           <a href="#">{crumb}</a>
//           {index < crumbs.length - 1 && " > "}{" "}
//         </span>
//       ))}
//     </div>
//   );
// };

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="breadcrumb">
      {breadcrumbs.map(({ breadcrumb, match }, index) => (
        <span key={match.url}>
          <a href={match.url}>{breadcrumb}</a>
          {index < breadcrumbs.length - 1 && " > "}{" "}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
