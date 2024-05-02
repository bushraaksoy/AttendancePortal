import React, { createContext, useContext, useState } from "react";

const Breadcrumbscontext = createContext();

export const useBreadcrumbs = () => useContext(BreadcrumbsContext);

export const BreadcrumbsProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  return (
    <BreadcrumbsContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};
