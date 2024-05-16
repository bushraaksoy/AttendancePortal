import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { capitalize } from "../utils";
import queryString from "query-string";

//! TODO: A lot of refactoring is needed, did a lot of hard coding with a bunch of if statements.

export const useBreadcrumbs = () => {
  const location = useLocation();
  const { courseGroup, courseId } = useParams();

  const currentQueryParams = queryString.parse(location.search);

  var paths = location.pathname.split("/").filter(Boolean);
  var breadcrumbs = [];
  var pathAccumulator = "";
  var accumulatedQueryParams = {}; // object of key value with { accumulated query. current query }

  paths.forEach((crumb, index) => {
    pathAccumulator += `/${crumb}`;

    let label = capitalize(crumb);

    if (currentQueryParams.code && courseId == label) {
      label = capitalize(currentQueryParams.code);
    } else if (courseGroup && index === paths.length - 2) {
      label += ` ${capitalize(paths[index + 1])}`;
      // Skip the next iteration
      pathAccumulator += `/${paths[index + 1]}`;
      paths.splice(index + 1, 1);
    }

    Object.assign(accumulatedQueryParams, currentQueryParams);

    const queryStr = queryString.stringify(accumulatedQueryParams);

    breadcrumbs.push({ path: `${pathAccumulator}?${queryStr}`, crumb: label });
  });

  breadcrumbs.unshift({ path: "/", crumb: "Home" });

  return breadcrumbs;
};

// Admin Breadcrumbs

export const useAdminBreadcrumbs = () => {
  const params = useParams();
  const location = useLocation();

  var paths = location.pathname.split("/").filter(Boolean);
  var breadcrumbs = [];
  var pathAccumulator = "";
  const currentQueryParams = queryString.parse(location.search);

  paths.forEach((crumb, index) => {
    pathAccumulator += `/${crumb}`;

    let label = capitalize(crumb);

    if (params.courseId && crumb == params.courseId) {
      label = currentQueryParams.code;
    }
    // Check for courseGroup and join with the next path
    if (params.courseGroup && crumb === params.courseGroup) {
      const remainingPaths = paths.splice(index + 1);
      const remainingLabels = remainingPaths.map(capitalize).join(" ");
      label += ` ${remainingLabels}`;
      pathAccumulator += `/${remainingPaths.join("/")}`;
      // Update index to skip the rest of the paths as they have been added
      index += remainingPaths.length;
    }

    // Check for teacherId and join all the coming ones
    if (params.teacherId && crumb === params.teacherId) {
      label = currentQueryParams.name;
      label += ` ${capitalize(paths[index + 1])}`;
      pathAccumulator += `/${paths[index + 1]}`;
      paths.splice(index + 1, 1);
    }

    breadcrumbs.push({ path: pathAccumulator, crumb: label });
  });

  return breadcrumbs;
};
