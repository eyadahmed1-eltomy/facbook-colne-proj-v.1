const express = require('express');
const router = express.Router();
// Mock data since we're setting up the structure
router.post('/login', (req, res) => {
  res.json({ token: 'mock-jwt-token', user: { id: '1', name: 'Alex Velorum', email: req.body.email } });
});

router.post('/register', (req, res) => {
  res.status(201).json({ token: 'mock-jwt-token', user: { id: '2', name: req.body.name, email: req.body.email } });
});

module.exports = router;
