const express = require('express');
const router = express.Router();
const Student = require('../models/Students');
const Book = require('../models/Books');

// Fetch issued books by roll number
router.get('/:rollNumber', async (req, res) => {
  const rollNumber = req.params.rollNumber;
  
  try {
    const student = await Student.findOne({ rollNumber }).populate('issuedBooks.bookId');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ issuedBooks: student.issuedBooks,studentName: student.name,
      studentCourse:student.department
     });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching issued books', error: err.message });
  }
});



// Return a book
router.post('/return-book', async (req, res) => {
  const { rollNumber, bookId } = req.body;

  try {
    const student = await Student.findOne({ rollNumber });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Find index of issued book
    const bookIndex = student.issuedBooks.findIndex(
      (entry) => entry.bookId.toString() === bookId && !entry.returned
    );

    if (bookIndex === -1) {
      return res.status(400).json({ message: 'Book not found in issued list or already returned' });
    }

    // Get the issued book object
    const issuedBook = student.issuedBooks[bookIndex];

    // Remove from issuedBooks array
    student.issuedBooks.splice(bookIndex, 1);

    // Add to returnedBooks array with return info
    student.returnedBooks.push({
      bookId: issuedBook.bookId,
      issueDate: issuedBook.issueDate,
      returnDate: new Date(),
      returned: true,
    });

    await student.save();

    // Update book quantity
    const book = await Book.findById(bookId);
    if (book) {
      book.quantity += 1;
      await book.save();
    }

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error returning book', error: err.message });
  }
});




module.exports = router;
