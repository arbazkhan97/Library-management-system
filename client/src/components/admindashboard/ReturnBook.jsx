import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ReturnBook.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ReturnBook = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentCourse, setStudentCourse] = useState('');


  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3002/api/return/${rollNumber}`);
      // Filter out entries with null bookId
      

      const validIssuedBooks = res.data.issuedBooks.filter(book => book.bookId !== null);
      setIssuedBooks(validIssuedBooks);
      setStudentName(res.data.studentName || '');
      setStudentCourse(res.data.studentCourse || '')
    } catch (err) {
      toast.error('Student not found or server error');
      setIssuedBooks([]);
      setStudentName('');
      setStudentCourse('')
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (bookId) => {
  try {
    await axios.post(`http://localhost:3002/api/return/return-book`, {
      rollNumber,
      bookId
    });
    toast.success('Book returned successfully');
     setTimeout(()=> navigate('/admin/dashboard')  ,1500) ;



    // Update issued books state
    setIssuedBooks(prev => prev.filter(book => book.bookId?._id !== bookId));

    // Notify GetAllBooks to refetch books
    if (window.refetchBooks) {
      window.refetchBooks();
    }
  } catch (err) {
    toast.error('Failed to return book');
  }
};



  return (
    <div className="return-book-container">
      <h2>📚 Return Book</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {studentName && <p><strong>Student Name:</strong> {studentName}</p>}
      {studentCourse && <p><strong>Course:</strong> {studentCourse}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : issuedBooks.length > 0 ? (
        <div className="table-wrapper">
          <table className="book-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Issue Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {issuedBooks.map((book, index) => (
                // Use book.bookId._id if exists else fallback to index for key
                <tr key={book.bookId?._id || index}>
                  
                  <td>{book.bookId?.title || 'N/A'}</td>
                  <td>{book.bookId?.author || 'N/A'}</td>
                  <td>{new Date(book.issueDate).toLocaleDateString()}</td>
                  <td>
                    <button className="return-btn" onClick={() => handleReturn(book.bookId._id)}>
                      Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-books">No issued books found.</p>
      )}
    </div>
  );
};

export default ReturnBook;
