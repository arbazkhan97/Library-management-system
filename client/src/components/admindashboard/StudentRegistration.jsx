import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import '../styles/studentRegistration.css';  // CSS file import
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_URL;


const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    department: '',
    year: ''
  });
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.name || !formData.rollNumber || !formData.department || !formData.year) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/students/registration`, {
        ...formData,
        year: Number(formData.year)
      });
      toast.success(res.data.message || 'Student registered successfully!');
      setFormData({ name: '', rollNumber: '', department: '', year: '' });
      
      setTimeout(()=>{
        navigate('/admin/dashboard');
      },1500)
      
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to register student';
      toast.error(msg);
    }
    setLoading(false);
   
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" />
      <h2>Student Registration</h2>
      <form className="form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="input"
        />

        <input
          type="text"
          name="rollNumber"
          placeholder="Roll Number"
          value={formData.rollNumber}
          onChange={handleChange}
          className="input"
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="input"
        />

        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          className="input"
          min={1}
          max={5}
        />

        <button type="submit" disabled={loading} className="btn">
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default StudentRegistration;
