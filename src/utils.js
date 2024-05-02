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
      window.location.href("/login");
      throw new Error(res.statusText);
    }

    return await res.json();
  } catch (error) {
    localStorage.removeItem("token");
    window.location.pathname = "/login";
    // throw new Error(`Fetch failed: ${error.message}`);
  }
};

// date time formatter
export const formatDateAndTime = (timeArray) => {
  if (!timeArray || timeArray.length < 5)
    return { dateStr: "Invalid date", timeStr: "Invalid time" };

  const [year, month, date, hour, minute] = timeArray;
  const dateStr = `${date.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year}`;
  const timeStr = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;

  return { dateStr, timeStr };
};

//date formatter
export const formatDate = (dateArray) => {
  if (!dateArray || dateArray.length < 3) return "Invalid date";

  const [year, month, date] = dateArray;
  const dateStr = `${date.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year}`;

  return dateStr;
};

export const formatTime = (timeArray) => {
  if (!timeArray || timeArray.length < 2) {
    return "Invalid time"; // Return this if the array is not valid
  }

  const [hour, minute] = timeArray;
  const timeStr = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;

  return timeStr;
};
