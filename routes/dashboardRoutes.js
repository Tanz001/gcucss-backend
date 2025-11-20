const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { getStats } = require('../controllers/dashboardController');

// Protected route (admin only)
router.get('/stats', authenticate, getStats);

module.exports = router;




