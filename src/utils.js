import { useNavigate } from "react-router-dom";
import useToast from "./Hooks/useToast";

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
