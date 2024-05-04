import { useEffect, useState } from "react";
import useAuthenticate from "../../hooks/useAuthenticate";

import "./Login.css";

const Login = () => {
  const authResult = new URLSearchParams(window.location.search);
  const token = authResult.get("token");

  // login variables
  const [formData, setFormData] = useState({ email: "", password: "" });
  const authenticate = useAuthenticate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticate(formData.email, formData.password, token);
  };

  return (
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
