import React, { useState } from "react";
import './styles/AdminSignup.css';
import { useNavigate } from "react-router-dom";
import Toast from '../components/admindashboard/Toast';
const BASE_URL = import.meta.env.VITE_API_URL;
const AdminSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    const adminData = { name, email, password };

    try {
      const response = await fetch(`${BASE_URL}/api/admin/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
      });

      const result = await response.json();

      if (response.ok) {
        showToastMessage("Admin signed up successfully!");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000);
      } else {
        setError(result.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Admin Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/admin/login">Login</a>
      </p>
      {showToast && <Toast message={toastMessage} />}
    </div>
  );
};

export default AdminSignup;
