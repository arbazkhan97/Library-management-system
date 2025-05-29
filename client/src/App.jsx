import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Updated import
import AdminHome from './components/AdminHome'
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import AllAdminDashboard from "./components/admindashboard/AllAdminComponents";
// import Dashboard from './components/admindashboard/Dashboard'
function App() {
  return (
    <Router>
      
      <Routes>
        
        <Route path="/" element={<AdminHome />} /> 
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/dashboard/*" element={<AllAdminDashboard/>} />
        <Route path='*' element={<h1>404 not found</h1>} />
        
      </Routes>
    </Router>
  );
}


export default App;
