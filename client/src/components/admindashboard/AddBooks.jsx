import React, { useState } from 'react';
import '../styles/AddBooks.css';
import Toast from './Toast'
import { useNavigate } from 'react-router-dom';

const AddBooks = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); 
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    image: '',
    category: '',
    isbn: '',
    quantity: '',
    available: true,
  });

  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithFile = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataWithFile.append(key, formData[key]);
    });

    try {
      const res = await fetch('http://localhost:3002/api/books/addBook', {
        method: 'POST',
        body: formDataWithFile,
      });

      const data = await res.json(); 
      if (!res.ok) throw new Error(data.message || 'Failed');

      setSuccessMsg(data.message || 'Book added successfully!');
      setTimeout(()=> navigate('/admin/dashboard') ,1500)
      setErrorMsg(""); //
      setFormData({
        title: '',
        author: '',
        image: '',
        category: '',
        isbn: '',
        quantity: '',
        available: true,
      });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error in adding book.'); 
      setSuccessMsg(""); 
    }
  };

  {errorMsg && <p className="form-error position-right">{errorMsg}</p>}
      {successMsg && <p className="form-success position-right ">{successMsg}</p>}

  return (
    <div className="addbook-container">
      <h2 className="addbook-title">Add New Book</h2>

      
      

      <form onSubmit={handleSubmit} className="addbook-form" encType="multipart/form-data">

        <div className="form-field">
          <input
            type="text"
            name="title"
            id="title"
            required
            value={formData.title}
            onChange={handleChange}
          />
          <label htmlFor="title">Title</label>
        </div>

        <div className="form-field">
          <input
            type="text"
            name="author"
            id="author"
            required
            value={formData.author}
            onChange={handleChange}
          />
          <label htmlFor="author">Author</label>
        </div>

        <div className="form-field">
          <input
            type="file"
            name="image"
            id="image"
            required
            onChange={handleFileChange}
          />
          <label htmlFor="image">Book Image</label>
        </div>

        <div className="form-field">
          <input
            type="text"
            name="category"
            id="category"
            required
            value={formData.category}
            onChange={handleChange}
          />
          <label htmlFor="category">Category</label>
        </div>

        <div className="form-field">
          <input
            type="text"
            name="isbn"
            id="isbn"
            required
            value={formData.isbn}
            onChange={handleChange}
          />
          <label htmlFor="isbn">ISBN</label>
        </div>

        <div className="form-field">
          <input
            type="number"
            name="quantity"
            id="quantity"
            required
            value={formData.quantity}
            onChange={handleChange}
          />
          <label htmlFor="quantity">Quantity</label>
        </div>

        <div className="checkbox-field">
          <label>
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            Available
          </label>
        </div>

        <button type="submit">Add Book</button>
        
      </form>
      {/* // show toast message */}

      {successMsg && <Toast message={successMsg} />}
    </div>
  );
};

export default AddBooks;
