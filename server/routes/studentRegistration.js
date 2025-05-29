const express = require('express');
const router = express.Router();
const Student = require('../models/Students');

// 📌 Register a new student
router.post('/registration', async (req, res) => {
  try {
    const { name, rollNumber, department, year } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this roll number already exists.' });
    }

    const student = new Student({ name, rollNumber, department, year });
    await student.save();

    res.status(201).json({ message: 'Student registered successfully', student });
  } catch (err) {
    res.status(500).json({ message: 'Error registering student', error: err.message });
  }
});




// Get student by roll number
router.get('/:rollNumber', async (req, res) => {
  try {
    const student = await Student.findOne({ rollNumber: req.params.rollNumber });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching student' });
  }
});


module.exports = router;
