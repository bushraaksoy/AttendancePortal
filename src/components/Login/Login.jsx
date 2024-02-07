import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { LoginContext } from "../../Context/LoginContext";
import useFetch from "../../Hooks/useFetch";
import useToast from "../../Hooks/useToast";

const Login = () => {
  const navigate = useNavigate();
  const submitBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    data: users,
    pending,
    error,
  } = useFetch("http://localhost:3002/users");
  const { setIsAuth } = useContext(LoginContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" && password === "") {
      useToast("Username and Password are required", "error");
    } else if (username === "") {
      useToast("Username is Required!", "error");
    } else if (password === "") {
      useToast("Password is Required!", "error");
    }

    if (!users) {
      useToast(error, "error");
    } else {
      const authUser = users.find(
        (user) => user.email === username && user.password === password
      );
      if (authUser) {
        setIsAuth(true);
        useToast("Logged in Successfully", "success");
        navigate("/dashboard");
      } else if (username !== "" && password !== "") {
        useToast("Invalid Username or Password!", "error");
      }
    }
  };

  const handleKeydown = (e) => {
    if (e.keyCode == 13) {
      submitBtn.current.click();
    }
  };

  return (
    <div className="login">
      <div className="form-title">
        <h1>Welcome to Attendance Portal👋</h1>
      </div>

      <form className="form" action="/login" method="post">
        <label htmlFor="username">
          Email:
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="Enter your username"
            required
            onKeyDown={handleKeydown}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            onKeyDown={handleKeydown}
          />
        </label>

        <button
          ref={submitBtn}
          onKeyDown={handleKeydown}
          onClick={handleSubmit}
          type="button"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
