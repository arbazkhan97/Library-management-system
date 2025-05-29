
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminHome from './AdminHome';
import Dashboard from './Dashboard';
import AddBooks from './AddBooks';
import GetAllBooks from './GetAllBooks';
import BookDetails from './BookDetails'
import EditBook from './EditBook';
import StudentRegistration from './StudentRegistration';
import IssueBook from './IssueBook';
import ReturnBook from './ReturnBook';
import FineCalculator from './FineCalculator';
import AdminProfile from './AdminProfile';
import Logout from './Logout';


const AllAdminDashboard = () => {
    return (
        <>
            {/* <h1>Admin Dashboard</h1> */}
            
            <Routes>
            

                 <Route path="/" element={< Dashboard/>}/>
                <Route path="/home" element={<AdminHome/>} />
                <Route path="/add-book" element={<AddBooks />}/>
                <Route path="/all-books" element={<GetAllBooks />} />
                <Route path="/all-books/:id" element={<BookDetails />} />
                <Route path="/all-books/edit/:id" element={<EditBook />} />
                <Route path="/student-registration" element={<StudentRegistration/>} />
                <Route path="/issue-book" element={<IssueBook/>} />
                <Route path="/return-book" element={<ReturnBook />} />
                <Route path='/fine-calculator' element={<FineCalculator/>}  />
                <Route path='/profile' element={<AdminProfile/>} />
                <Route path='/logout' element={<Logout/>}  />

                
                {/* <Route path="view-reports" element={<ViewReports />} /> */}
                <Route path="*" element={<h1>404 page not found</h1>} />
            </Routes>
        </>
    );
}

export default AllAdminDashboard;
