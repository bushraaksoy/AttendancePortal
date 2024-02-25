import { useEffect, useState } from "react";

const Testing = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              login: "user11",
              password: "password11",
            }),
          }
        );
        console.log("login response: ", response);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          throw new Error("Request failed!");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {userData && <div>{JSON.stringify(userData)}</div>}
    </div>
  );
};

export default Testing;
