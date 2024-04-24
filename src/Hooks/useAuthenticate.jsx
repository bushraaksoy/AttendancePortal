import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../Context/LoginContext";
import useToast from "./useToast";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const url = `${API_BASE_URL}/auth/login`;

const useAuthenticate = () => {
  const { setUser } = useLoginContext();
  const navigate = useNavigate();

  const authenticate = async (username, password) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: username,
          password: password,
        }),
      });

      const responseCode = response.status;

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", JSON.stringify(data.access_token));
        setUser({ login: data.login, role: data.role });

        if (data.role === "ADMIN") {
          console.log("Logged in as ADMIN");
          navigate("/dashboard");
        } else {
          console.log(`Logged in as ${data.role}`);
          navigate("/");
        }

        console.log("successful login");
        useToast("Logged in Successfully", "success");
        return;
      } else if (responseCode === 401 || responseCode === 403) {
        useToast("Invalid Email or Password!", "error");
      } else if (responseCode === 404) {
        useToast("Resource not found!", "error");
      } else {
        throw new Error("Request failed!");
      }
    } catch (error) {
      useToast("Failed to Login", "error");
      throw new Error(error.message);
    }
  };

  return authenticate;
};

export default useAuthenticate;
