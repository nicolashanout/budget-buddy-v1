const express = require('express');
const router = express.Router();

// @route  GET api/settings
// @desc   Test route
// @access Public
router.get('/', (req, res) => {
  res.send('settings Route');
});

module.exports = router;
