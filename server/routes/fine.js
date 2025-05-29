// routes/fineRoutes.js (ya jahan tum route rakh rahe ho)

const express = require('express');
const router = express.Router();
const Student = require('../models/Students'); // path apne hisab se adjust karo

router.get('/:rollNumber', async (req, res) => {
  const rollNumber = req.params.rollNumber;

  try {
    const student = await Student.findOne({ rollNumber }).populate('issuedBooks.bookId').populate('returnedBooks.bookId');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const finePerDay = 5; // ₹5 per extra day
    const maxDays = 7;
    let totalFine = 0;

    // Prepare issuedBooks with returned = false
    const issuedBooksDetails = student.issuedBooks.map(entry => {
      const issueDate = new Date(entry.issueDate);
      const effectiveDate = new Date(); // today since not returned
      const diffDays = Math.floor((effectiveDate - issueDate) / (1000 * 60 * 60 * 24));
      const extraDays = diffDays > maxDays ? diffDays - maxDays : 0;
      const fine = extraDays * finePerDay;
      totalFine += fine;

      return {
        title: entry.bookId?.title || 'N/A',
        issueDate,
        returnDate: null,
        fine,
        returned: false
      };
    });

    // Prepare returnedBooks with returned = true
    const returnedBooksDetails = student.returnedBooks.map(entry => {
      const issueDate = new Date(entry.issueDate);
      const returnDate = new Date(entry.returnDate);
      const diffDays = Math.floor((returnDate - issueDate) / (1000 * 60 * 60 * 24));
      const extraDays = diffDays > maxDays ? diffDays - maxDays : 0;
      const fine = extraDays * finePerDay;
      totalFine += fine;

      return {
        title: entry.bookId?.title || 'N/A',
        issueDate,
        returnDate,
        fine,
        returned: true
      };
    });

    const allBooks = [...issuedBooksDetails, ...returnedBooksDetails];

    res.json({
      name: student.name,
      rollNumber: student.rollNumber,
      totalFine,
      totalBooks: allBooks.length,
      issuedBooks: allBooks,
    });

  } catch (err) {
    res.status(500).json({ message: 'Error calculating fine', error: err.message });
  }
});


module.exports = router;
