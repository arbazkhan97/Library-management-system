import React, { useState, useEffect } from 'react';
import '../styles/IssueBook.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const IssueBook = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [student, setStudent] = useState(null);
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:3002/api/books/available-books');
      setBooks(res.data);
    } catch (err) {
      toast.error('Failed to fetch books');
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:3002/api/students/${rollNumber}`);
      setStudent(res.data);
      fetchBooks();
    } catch (err) {
      toast.error('Student not found');
      setStudent(null);
    }
  };

  const handleIssue = async () => {
    if (!selectedBookId) {
      return toast.warning('Please select a book');
    }

    try {
      await axios.post('http://localhost:3002/api/issue/issue-book', {
        rollNumber,
        bookId: selectedBookId
      });
      toast.success('Book issued successfully');
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (err) {
      toast.error('Failed to issue book');
    }
  };

  const bookOptions = books.map(book => ({
    value: book._id,
    label: `${book.title} by ${book.author}`
  }));

  return (
    <div className="issue-book-container">
      <h2>📚 Issue Book</h2>

      <div className="search-section">
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <button onClick={handleSearch}>Search Student</button>
      </div>

      {student && (
        <div className="student-details">
          <h3>Student: {student.name}</h3>
          <p>Roll: {student.rollNumber}</p>
          <p>Department: {student.department}</p>
          <p>Year: {student.year}</p>

          <div className="book-select">
            <label>Select Book (Dropdown):</label>
            <select
              value={selectedBookId}
              onChange={(e) => setSelectedBookId(e.target.value)}
            >
              <option value="">-- Choose Book --</option>
              {books.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.title} by {book.author}
                </option>
              ))}
            </select>

            <label style={{ marginTop: '20px' }}>Or Search Book by Title:</label>
            <Select
              options={bookOptions}
              onChange={(selectedOption) => setSelectedBookId(selectedOption.value)}
              placeholder="Search book by title..."
              isSearchable
            />
          </div>

          <button className="issue-btn" onClick={handleIssue}>
            Issue Book
          </button>
        </div>
      )}
    </div>
  );
};

export default IssueBook;
