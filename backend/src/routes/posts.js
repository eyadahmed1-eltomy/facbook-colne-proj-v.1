const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, content: 'Hello world!' }]);
});

router.post('/', (req, res) => {
  res.status(201).json({ id: 2, content: req.body.content });
});

module.exports = router;
