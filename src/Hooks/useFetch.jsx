import { useEffect, useState } from "react";

const useFetch = async (url, options) => {
  const [response, setResponse] = useState(null);
  const token = localStorage.getItem("token").replace(/"/g, "");
  // Add the Authorization header to the request
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url, options);
      // If the token is expired, redirect to login
      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }
      // Get the response data
      const data = await res.json();
      setResponse(data);
    };
    fetchData();
  }, [url, options]);
  return response;
};

export default useFetch;
