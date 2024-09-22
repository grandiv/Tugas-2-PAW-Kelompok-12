const express = require('express');
const router = express.Router();

// Example route for reviews
router.get('/', (req, res) => {
  res.send('List of reviews');
});

module.exports = router;
