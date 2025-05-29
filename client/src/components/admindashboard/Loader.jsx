import React from 'react';
import '../styles/Loader.css'; 

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
