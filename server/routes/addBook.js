const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2; // Make sure to import cloudinary correctly
const upload = multer({ storage: multer.memoryStorage() }); // Multer for file handling

const Book = require("../models/Books");

// Cloudinary configuration (ensure you've set up your Cloudinary credentials)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET_KEY
});

router.post('/addBook', upload.single('image'), async (req, res) => {
  try {
    const { title, author, category, isbn, available, quantity } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required.' });
    }

    // Wrap Cloudinary upload in a promise
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'books' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer); // Ensure file buffer is sent to Cloudinary
    });

    // Create new book document in database
    const newBook = new Book({
      title,
      author,
      category,
      isbn,
      available: available === 'true', // Convert string to boolean
      quantity,
      image: uploadResult.secure_url // Store Cloudinary URL
    });

    await newBook.save();
    res.status(201).json({ message: 'Book added successfully!', book: newBook });

  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.isbn) {
      return res.status(400).json({ message: "ISBN must be unique" });
    }
    console.error(err);
    res.status(500).json({ message: 'Error adding book', error: err.message });
  }
});

module.exports = router;
