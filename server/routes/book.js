const express = require('express');
const router = express.Router();
const Book = require('../models/Books');

// Get available books
router.get('/available-books', async (req, res) => {
  try {
    const books = await Book.find({ quantity: { $gt: 0 } });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});

module.exports = router;
