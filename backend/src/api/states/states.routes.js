const express = require('express');

const router = express.Router();

// TODO: Actually call the queries...
router.get('/', (req, res) => {
  res.json([]);
});

module.exports = router;
