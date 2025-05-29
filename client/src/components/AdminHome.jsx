import React from "react";
import { Link } from "react-router-dom";
import './styles/AdminHome.css'; // Make sure this path is correct

const AdminHome = () => {
  return (
    <div className="admin-home-container">
      <h1 className="admin-home-title">Welcome to Admin Panel</h1>
      <p className="admin-home-subtext">
        Please Login or Signup to proceed to the Dashboard.
      </p>

      <div className="admin-home-buttons">
        <Link to="/admin/login">
          <button className="login-btn">Login</button>
        </Link>
        <Link to="/admin/signup">
          <button className="signup-btn">Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
