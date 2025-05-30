import '../styles/AdminDashboard.css'
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <nav>
          <ul>
            <li><Link to="/admin/dashboard/home">Home</Link></li>
            <li><Link to="/admin/dashboard/add-book">Add Book</Link></li>
            <li><Link to="/admin/dashboard/all-books">Manage Books</Link></li>
            <li><Link to="/admin/dashboard/student-registration">Student Registration</Link></li>
            <li><Link to="/admin/dashboard/issue-book">Issue Book</Link></li>
            <li><Link to="/admin/dashboard/return-book">Return Book</Link></li>
            <li><Link to="/admin/dashboard/fine-calculator">Fine Calculation</Link></li>
            <li><Link to="/admin/dashboard/profile">Profile</Link></li>
            <li><Link to="/admin/dashboard/logout">Logout</Link></li>
          </ul>
        </nav>
      </div>

      <div className="main-content">
        <h2>Welcome to the Admin Dashboard!</h2>
        
        
      </div>
    </div>
  );
};

export default Dashboard;
