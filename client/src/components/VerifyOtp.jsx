import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const BASE_URL = import.meta.env.VITE_API_URL;

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();
  const email = localStorage.getItem('resetEmail');

  useEffect(() => {
    const expiry = parseInt(localStorage.getItem('otpExpiry'), 10);
    const interval = setInterval(() => {
      const remaining = Math.max(0, expiry - Date.now());
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const min = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const sec = String(totalSec % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (timeLeft === 0) {
      toast.error('OTP expired. Please request again.');
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/verify-otp`, { email, otp });
      toast.success('OTP verified');
      navigate('/reset-password');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <div className="auth-container">
      <h2>Verify OTP</h2>

      <p style={{ color: timeLeft === 0 ? 'red' : 'green', marginBottom: '10px' }}>
        {timeLeft === 0
          ? 'OTP expired. Please request again.'
          : `OTP expires in: ${formatTime(timeLeft)}`}
      </p>

      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit" disabled={timeLeft === 0}>
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
