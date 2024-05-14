import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const url = `${API_BASE_URL}/auth/login`;

const useAuthenticate = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const authenticate = async (username, password, token) => {
    setLoading(true);
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

        data.role == "ADMIN"
          ? navigate("/dashboard")
          : token
          ? navigate(`/?token=${token}`)
          : navigate("/");

        toast.success("Logged in Successfully");
        return;
      } else if (responseCode === 401 || responseCode === 403) {
        toast.error("Invalid Email or Password!");
      } else if (responseCode === 404) {
        toast.error("Resource not found!");
      } else {
        throw new Error("Request failed!");
      }
    } catch (error) {
      toast.error("Failed to Login");
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { authenticate, loading };
};

export default useAuthenticate;
