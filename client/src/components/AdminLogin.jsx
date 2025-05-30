import React, { useState } from "react";
import './styles/AdminLogin.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from '../components/admindashboard/Toast';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
const BASE_URL = import.meta.env.VITE_API_URL;

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // auto hide in 2s
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/admin/login`,
        { email, password }
      );

      const { token } = response.data;
      localStorage.setItem("token", token);
      showToastMessage("Admin logged in successfully!");
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500); // give time to show toast
    } catch (error) {
      setErrorMessage("Invalid credentials. Please try again.");
      showToastMessage("Login failed: Invalid credentials.");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="admin-login-form">
  <div className="input-group">
    <label htmlFor="email">Email</label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>
  <div className="input-group">
    <label htmlFor="password">Password</label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>
  <button type="submit">Login</button>
</form>


      {showToast && <Toast message={toastMessage} />}
    </div>
  );
};

export default AdminLogin;
