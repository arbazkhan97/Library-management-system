import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const BASE_URL = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/forgot-password`, { email });

      localStorage.setItem('resetEmail', email);
      localStorage.setItem('otpExpiry', Date.now() + 2 * 60 * 1000);
      toast.success('OTP sent to your register email');
      navigate('/verify-otp');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending OTP');
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSendOtp}>
        <input
          type="email"
          placeholder="Enter registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
