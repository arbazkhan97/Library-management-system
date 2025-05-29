import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FineCalculator.css'; // Separate CSS file for styling

const FineCalculator = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchFineDetails = async () => {
    setLoading(true);
    setError('');
    setStudentData(null);

    try {
      const response = await axios.get(`http://localhost:3002/api/fines/${rollNumber.trim()}`);
      setStudentData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching fine details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <div className="fine-calculator-container">
      <h2>Fine Calculation </h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter Student Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <button onClick={fetchFineDetails} disabled={!rollNumber.trim()}>
          <i className="fas fa-search"></i>  Calculate Fine
        </button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {studentData && (
        <div className="result-container">
          <h3>Student: {studentData.name} </h3>
          <p>Roll no. :{studentData.rollNumber}</p>
          <p>Total Fine: ₹{studentData.totalFine}</p>

          {studentData.issuedBooks.length === 0 ? (
            <p>No issued or returned books found for this student.</p>
          ) : (
            <table className="fine-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Issue Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                  <th>Fine (₹)</th>
                </tr>
              </thead>
              <tbody>
                {studentData.issuedBooks.map((book, idx) => (
                  <tr key={idx} className={book.returned ? 'returned' : 'issued'}>
                    <td>{book.title}</td>
                    <td>{formatDate(book.issueDate)}</td>
                    <td>{formatDate(book.returnDate)}</td>
                    <td>{book.returned ? 'Returned' : 'Not Returned'}</td>
                    <td>{book.fine}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default FineCalculator;
