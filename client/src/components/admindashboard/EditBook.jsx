import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import '../styles/EditBook.css'
const BASE_URL = import.meta.env.VITE_API_URL;

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    quantity: 1,
    available: true,
  });
  const [currentImage, setCurrentImage] = useState(""); // For storing current image URL
  const [newImage, setNewImage] = useState(null);       // For new file upload

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/books/getAllBooks/${id}`);
        setBookData(res.data);
        setCurrentImage(res.data.image); 
      } catch (err) {
        console.error("Error fetching book data:", err);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(bookData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (newImage) {
      formData.append("image", newImage);
    }

    try {
      await axios.put(
        `${BASE_URL}/api/books/getAllBooks/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Book Updated successfully");
       setTimeout(()=>navigate("/admin/dashboard/all-books") , 1500) ;
    } catch (err) {
        toast.error("Failed to update book");
      console.error("Error updating book:", err);
    }
  };

  return (
    <>
    <div className="container mt-5  " >
    <h2 className='text-muted mt-5' >Edit Book</h2>
    
      <form className='' onSubmit={handleSubmit}>
      
      
        

        <label>Title:</label>
        <input type="text" name="title" value={bookData.title} onChange={handleChange} className="form-control mb-2" />

        <label>Author:</label>
        <input type="text" name="author" value={bookData.author} onChange={handleChange} className="form-control mb-2" />

        <label>Category:</label>
        <input type="text" name="category" value={bookData.category} onChange={handleChange} className="form-control mb-2" />

        <label>ISBN:</label>
        <input type="text" name="isbn" value={bookData.isbn} onChange={handleChange} className="form-control mb-2" />

        <label>Quantity:</label>
        <input type="number" name="quantity" value={bookData.quantity} onChange={handleChange} className="form-control mb-2" />

        <label>Available:</label>
        <select name="available" value={bookData.available} onChange={handleChange} className="form-control mb-2">
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        {/* Display current image */}
        {currentImage && (
          <div style={{ marginBottom: "5px" }}>
            <label>Current Image:</label><br />
            <img
              src={`${currentImage}`}
              alt="Current"
              style={{ width: "75px", height: "auto", marginTop: "5px", borderRadius: "5px" }}
            />
          </div>
        )}

        {/* Upload new image */}
        <label>Upload New Image (Optional):</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="form-control mb-3" />

        <button type="submit" className="btn btn-primary w-100">Update Book</button>
      </form>
    </div>
</>
  );
}


export default EditBook;
