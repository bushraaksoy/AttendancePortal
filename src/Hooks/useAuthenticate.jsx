import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import useToast from "./useToast";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const URL = `${API_BASE_URL}/auth/login`;

const url = "https://attendancesystem-qpr5.onrender.com/api/v1/auth/login";

const useAuthenticate = () => {
  const { setIsAuth, setToken, setUser } = useContext(LoginContext);
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
        setToken(data.access_token);
        setIsAuth(true);
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
      useToast(error.message, "error");
      console.log(error.message);
    }
  };

  return authenticate;
};

export default useAuthenticate;
