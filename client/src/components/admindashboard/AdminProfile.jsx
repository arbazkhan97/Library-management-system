// src/pages/AdminProfile.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/AdminProfile.css'; // Separate CSS file for styling
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_URL;

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/admin/login");
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/admin/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAdmin(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile", error);
        navigate("/admin/login");
      }
    };

    fetchAdminProfile();
  }, [navigate]);

  if (loading) return <div className="profile-loading">Loading profile...</div>;

  return (
    <div className="profile-container">
      <h2>Admin Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {admin.name}</p>
        <p><strong>Email:</strong> {admin.email}</p>
        <p><strong>Joined:</strong> {new Date(admin.createdAt).toLocaleDateString()}</p>
      </div> <br />
      <button onClick={()=> navigate('/admin/dashboard')} >Go back</button>
    </div>
  );
};

export default AdminProfile;
