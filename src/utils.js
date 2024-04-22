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

// custom fetch function with authentication + base url

export const customFetch = async (url, options) => {
  const URL = import.meta.env.VITE_APP_API_BASE_URL + url;

  try {
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    console.log(token);
    if (!token) {
      throw new Error("Token not found");
    }

    const res = await fetch(URL, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      localStorage.removeItem("token");
      throw new Error(res.statusText);
    }

    return await res.json();
  } catch (error) {
    throw new Error(`Fetch failed: ${error.message}`);
  }
};
