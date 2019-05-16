const express = require('express');
const router = express.Router();

// @route  GET api/budgets
// @desc   Test route
// @access Public
router.get('/', (req, res) => {
  res.send('budgets Route');
});

module.exports = router;
