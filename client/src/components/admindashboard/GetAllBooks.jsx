import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/GetAllBooks.css'
import Loader from './Loader'

import { useNavigate } from 'react-router-dom';

const getAllBooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate=useNavigate()

  const fetchBooks = async () => {
  try {
    const res = await fetch('http://localhost:3002/api/books/getAllBooks');
    const data = await res.json();
    const availableBooks = data.filter(book => book.quantity > 0); // Only quantity > 0
    setBooks(availableBooks);
  } catch (err) {
    console.error('Error fetching books:', err);
  }
};


  useEffect(() => {
  fetchBooks();

  // Listen to a custom event 'bookReturned' to refetch books dynamically
  const handleBookReturned = () => {
    fetchBooks();
  };

  window.addEventListener('bookReturned', handleBookReturned);

  return () => {
    window.removeEventListener('bookReturned', handleBookReturned);
  };
}, []);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (book) => {
    setSelectedBook(book);
  };

  if (!books) return <Loader />;

  return (
    <div className="booklist-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search books by title"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={() => navigate(`/admin/dashboard`)}> Go Back</button>
      </div>

      <div className="book-cards">
        {filteredBooks.map((book) => (
          <Link to={`/admin/dashboard/all-books/${book._id}`} key={book._id}>
            <div className="book-card ms-5 mb-3 me-4" onClick={() => handleCardClick(book)}>
              <img src={`${book.image}`} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              {/* <p> Category:{book.category}</p> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default getAllBooks;
