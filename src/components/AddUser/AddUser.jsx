import React, { useState } from "react";
import "./AddUser.css";
import { addUser } from "../../utils";
import useToast from "../../Hooks/useToast";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser(username, password, role);
    resetForm();
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setRole("");
  };

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <input
        value={username}
        type="text"
        placeholder="Username"
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        value={password}
        type="text"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        name="role"
        className="select-role-input"
        required
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">Select role</option>
        <option value="STUDENT">STUDENT</option>
        <option value="TEACHER">TEACHER</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
