import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from './Loader';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import '../styles/BookDetails.css'; // CSS import
const BASE_URL = import.meta.env.VITE_API_URL;

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/books/getAllBooks/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error("Error fetching book details", err);
        toast.error("Failed to fetch book details");
      }
    };
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/books/getAllBooks/${id}`);
      toast.success("Book deleted successfully");
      setTimeout(() => navigate("/admin/dashboard/all-books"), 1500);
    } catch (err) {
      console.error("Error deleting book", err);
      toast.error("Failed to delete book");
    }
  };

  if (!book) return <Loader />;

  return (
    <div className="book-details-container">
      <h2>{book.title}</h2>
      <img src={book.image} alt={book.title} />
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Category:</strong> {book.category}</p>
      <p><strong>Quantity:</strong> {book.quantity}</p>
      <p><strong>ISBN no.:</strong> {book.isbn}</p>
      <p><strong>Available:</strong> {book.available ? "Yes" : "No"}</p>

      <div className="book-buttons">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => navigate(`/admin/dashboard/all-books/edit/${id}`)}>Edit</button>
        <button onClick={() => navigate(`/admin/dashboard/all-books`)}>Go Back</button>
      </div>
    </div>
  );
};

export default BookDetails;
