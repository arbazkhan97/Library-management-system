import '../styles/AdminDashboard.css'
import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import CalculateIcon from '@mui/icons-material/Calculate';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import LogoutIcon from '@mui/icons-material/Logout';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <nav>
          <ul>
            <li><Link to="/admin/dashboard/home"> <HomeIcon style={{marginRight:'10px'}} /> Home</Link></li>
            <li><Link to="/admin/dashboard/add-book"> <LibraryBooksIcon style={{marginRight:'10px'}} /> Add Book</Link></li>
            <li><Link to="/admin/dashboard/all-books"> <MenuBookIcon style={{marginRight:'10px'}} /> Manage Books</Link></li>
            <li><Link to="/admin/dashboard/student-registration"> <AssignmentIndIcon style={{marginRight:'10px'}} /> Student Registration</Link></li>
            <li><Link to="/admin/dashboard/issue-book"> <BookmarkAddedIcon style={{marginRight:'10px'}}  /> Issue Book</Link></li>
            <li><Link to="/admin/dashboard/return-book"> <BookmarkRemoveIcon style={{marginRight:'10px'}} /> Return Book</Link></li>
            <li><Link to="/admin/dashboard/fine-calculator"> <CalculateIcon style={{marginRight:'10px'}} /> Fine Calculation</Link></li>
            <li><Link to="/admin/dashboard/profile"> <PersonPinIcon style={{marginRight:'10px'}} /> Profile</Link></li>
            <li><Link to="/admin/dashboard/logout"> <LogoutIcon style={{marginRight:"10px"}} /> Logout</Link></li>
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
