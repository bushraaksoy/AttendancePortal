import { useEffect, useState } from "react";
import useAuthenticate from "../../hooks/useAuthenticate";

import "./Login.css";
import { setFavicon } from "../../utils";

const Login = () => {
  const authResult = new URLSearchParams(window.location.search);
  const token = authResult.get("token");

  // login variables
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { authenticate, loading } = useAuthenticate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const defaultFavicon = "/logo_sdu.png"; // Path to your default favicon
  const loadingFavicon = "/loading-favicon.gif"; // Path to your loading GIF

  const handleSubmit = (e) => {
    e.preventDefault();
    setFavicon(loadingFavicon);
    authenticate(formData.email, formData.password, token).finally(() => {
      setFavicon(defaultFavicon);
    });
  };

  return (
    <>
      <img
        className="big-screen"
        width={"350px"}
        src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.png?f=webp"
        alt="login"
      />
      <div className="big-screen" style={{ width: "70px" }}></div>
      <div className="login">
        <div className="form-title">
          <h1>Welcome to Attendance Portal👋</h1>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Enter your username"
              required
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              required
              onChange={handleChange}
            />
          </label>
          <button type="submit" disabled={loading}>
            {" "}
            Login
            {/* {loading ? "Loading..." : "Login"} */}
          </button>
          <div style={{ textAlign: "center" }}>
            {loading ? "Loading..." : ""}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
