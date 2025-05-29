// Toast.js
import React, { useState, useEffect } from 'react';
import '../styles/Toast.css'; // Import CSS for toast styles

const Toast = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false); 
      }, 2000); 
    }
  }, [message]);

  return (
    <div className={`toast ${visible ? 'show' : 'hide'}`}>
      {message}
    </div>
  );
};

export default Toast;
