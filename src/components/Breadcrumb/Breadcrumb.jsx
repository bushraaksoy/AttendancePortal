import React from "react";
import "./Breadcrumbs.css";
import {
  useAdminBreadcrumbs,
  useBreadcrumbs,
} from "../../hooks/useBreadcrumbs";
import { useAuthContext } from "../../context/AuthContext";

const Breadcrumbs = () => {
  const { user } = useAuthContext();
  const breadcrumbs =
    user.role == "ADMIN" ? useAdminBreadcrumbs() : useBreadcrumbs();
  const styles = { color: "#2d62af", fontWeight: "500" };

  return (
    <div className="breadcrumb">
      {breadcrumbs.map(({ path, crumb }, index) => {
        const lastItem = index === breadcrumbs.length - 1;
        return (
          <span style={lastItem ? styles : {}} key={index}>
            <a href={path}>{crumb}</a>
            {lastItem ? " " : " > "}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;

// import React from "react";
// import "./Breadcrumbs.css";
// import { useParams } from "react-router-dom";
// import useBreadcrumbs from "../../hooks/useBreadcrumbs";

// const Breadcrumbs = () => {
//   const breadcrumbs = useBreadcrumbs();
//   const styles = { color: "#40526c", fontWeight: "500" };
//   console.log("breadcrumbs", breadcrumbs);

//   return (
//     <div className="breadcrumb">
//       {breadcrumbs.map(({ path, crumb }, index) => {
//         const lastItem = index == breadcrumbs.length - 1;
//         return (
//           <span
//             style={index == breadcrumbs.length - 1 ? styles : {}}
//             key={index}
//           >
//             <a href={path}>{crumb}</a>
//             {lastItem ? " " : " > "}
//           </span>
//         );
//       })}
//     </div>
//   );
// };

// export default Breadcrumbs;

// const breadcrumbs = useBreadcrumbs();

//   const styles = { color: "#40526c", fontWeight: "500" };

//   return (
//     <div className="breadcrumb">
//       {breadcrumbs.map(({ breadcrumb, match }, index) => {
//         console.log("match: ", match);
//         console.log("breadcrumb: ", breadcrumb);
//         return (
//           <span
//             style={index == breadcrumbs.length - 1 ? styles : {}}
//             key={index}
//           >
//             <a href={match.pathname}>{breadcrumb}</a>
//             {index < breadcrumbs.length - 1 && " > "}{" "}
//           </span>
//         );
//       })}
//     </div>
//   );
