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

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticate(formData.email, formData.password, token);
  };

  return (
    <>
      <img
        className="big-screen"
        style={{ filter: "brightness(.93)" }} // .97 for first and .93 for second
        width={"410px"}
        src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?b=1&s=612x612&w=0&k=20&c=9H5N9Jy8BA9yCzL-Wt5uCeZqETmpPYsJKJ2Nh1-SDaw="
        // src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.png?f=webp"
        alt="login"
      />
      <div className="big-screen" style={{ width: "60px" }}></div>
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
          <div style={{ textAlign: "center", fontSize: "10px", color: "#999" }}>
            {loading ? "Loading..." : ""}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
