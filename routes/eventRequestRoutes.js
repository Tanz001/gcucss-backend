const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  getAllEventRequests,
  createEventRequest,
  deleteEventRequest
} = require('../controllers/eventRequestController');

// Public routes
router.post('/', createEventRequest);

// Protected routes (admin only)
router.get('/', authenticate, getAllEventRequests);
router.delete('/:id', authenticate, deleteEventRequest);

module.exports = router;


