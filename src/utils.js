import useToast from "./Hooks/useToast";

// function to add a new user to the database using the backend api endpoint for adding user
export const addUser = async (username, password, role) => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: username,
        password: password,
        role: role,
      }),
    });

    if (response.ok) {
      useToast("User added successfully!", "success");
    } else {
      console.log(response);
      throw new Error("Request failed!");
    }
  } catch (error) {
    console.log(error.message);
  }
};

// custom fetch function for fetch with authentification DRY
export async function fetchWithAuth(url, options = {}) {
  // Get the token from local storage
  const token = localStorage.getItem("token");

  // Add the Authorization header to the request
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  // Make the request
  const response = await fetch(url, options);

  // If the token is expired, redirect to login
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  // Otherwise, return the response
  return response;
}
