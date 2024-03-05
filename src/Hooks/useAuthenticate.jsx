import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import useToast from "./useToast";

const URL = `http://localhost:8080/api/v1/auth/login`;

const useAuthenticate = () => {
  const { setIsAuth, setToken } = useContext(LoginContext);
  const navigate = useNavigate();

  const authenticate = async (username, password) => {
    try {
      const response = await fetch(URL, {
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
        setToken(data.token);
        setIsAuth(true);
        navigate("/");
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
