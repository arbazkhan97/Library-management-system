
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Welcome to Admin Dashboard', admin: req.admin });
});

module.exports = router;
