import { useState, useCallback } from "react";

export const useQueryParams = () => {
  const [queryParams, setQueryParams] = useState({});

  // Function to update query parameters
  const updateQueryParams = useCallback((path, params) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      [path]: params,
    }));
  }, []);

  // Function to get query parameters for a specific path
  const getQueryParams = useCallback(
    (path) => {
      return queryParams[path] || {};
    },
    [queryParams]
  );

  return { queryParams, updateQueryParams, getQueryParams };
};
