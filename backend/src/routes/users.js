const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: '1', name: 'Alex Velorum' }]);
});

router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'Alex Velorum' });
});

module.exports = router;
