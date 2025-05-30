
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Show toast
    toast.success('Logged out successfully');

    // Redirect to homepage after short delay
    setTimeout(() => {
      navigate('/');
    }, 1500);
  }, [navigate]);

  return null; 
};

export default Logout;
