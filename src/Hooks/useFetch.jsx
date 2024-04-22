import { useEffect, useState } from "react";

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const token = localStorage.getItem("token");

  // Add the Authorization header to the request
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    // Define an async function
    const fetchData = async () => {
      // Make the request
      const res = await fetch(url, options);

      // If the token is expired, redirect to login
      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      // Get the response data
      const data = await res.json();

      // Set the response state
      setResponse(data);
    };

    // Invoke the async function
    fetchData();
  }, [url, options]);

  return response;
};

export default useFetch;
