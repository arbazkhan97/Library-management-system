import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const BASE_URL = import.meta.env.VITE_API_URL;


const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('resetEmail');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/reset-password`, { email, newPassword });
      toast.success('Password reset successful');
      localStorage.removeItem('resetEmail');
      navigate('/admin/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;
