import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminHomepage.css";
import {useNavigate} from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_API_URL;

const AdminHome = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [books, setBooks] = useState([]);
  const [issuedBookCount, setIssuedBookCount] = useState(0);
  const navigate =useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(`${BASE_URL}/api/admin/summary`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStudentCount(res.data.totalStudents);
        setBooks(res.data.books);
        setIssuedBookCount(res.data.issuedBooks);
      } catch (err) {
        console.error("Error fetching summary:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-home">
      <h2>Welcome to Admin Dashboard</h2>

      <div className="summary-box">
        <h3>Total Students</h3>
        <p>{studentCount}</p>
      </div>

      <div className="summary-box">
        <h3>Total Issued Books</h3>
        <p>{issuedBookCount}</p>
      </div>

      <div className="table-section">
        <h3>Books</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Total Quantity</th>
              <th>ISBN no.</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.quantity}</td>
                <td>{book.isbn}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div> <br />
     <button onClick={() => navigate(`/admin/dashboard`)}> Go Back</button>
    </div>
    
  );
};

export default AdminHome;
