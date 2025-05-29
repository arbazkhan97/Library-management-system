const express = require('express');
const router = express.Router();
const Student = require('../models/Students');
const Book = require('../models/Books');

// Issue book to student
router.post('/issue-book', async (req, res) => {
  const { rollNumber, bookId } = req.body;

  try {
    const student = await Student.findOne({ rollNumber });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const book = await Book.findById(bookId);
    if (!book || book.quantity <= 0) {
      return res.status(400).json({ message: 'Book not available' });
    }

    // Add to student's issuedBooks
    student.issuedBooks.push({ bookId });
    await student.save();

    // Reduce quantity of the book
    book.quantity -= 1;
    await book.save();  // quantity update only, no deletion

    res.status(200).json({ message: 'Book issued successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error issuing book', error: err.message });
  }
});

module.exports = router;
