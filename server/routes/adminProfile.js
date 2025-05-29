const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); // Adjust path if needed
const authMiddleware = require('../middleware/authMiddleware'); // Your existing middleware
const Student = require('../models/Students');
const Book = require('../models/Books');

// GET /api/admin/profile - View admin profile

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const adminId = req.admin.id; // decoded token has admin ID
    const admin = await Admin.findById(adminId).select('-password'); // exclude password

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (err) {
    console.error('Error fetching admin profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// home summery

router.get('/summary', authMiddleware, async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    const books = await Book.find({}, 'title author quantity isbn');

    const issuedBooksAgg = await Student.aggregate([
      { $unwind: '$issuedBooks' },
      { $match: { 'issuedBooks.returned': false } },
      { $count: 'total' }
    ]);
    const issuedBooks = issuedBooksAgg.length > 0 ? issuedBooksAgg[0].total : 0;

    res.status(200).json({
      totalStudents,
      books,
      issuedBooks
    });
  } catch (err) {
    console.error('Error in /summary:', err);
    res.status(500).json({ message: 'Failed to load summary' });
  }
});




module.exports = router;
