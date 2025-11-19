const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const { authenticate } = require('../middleware/auth');
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Protected routes (admin only)
router.post('/', authenticate, upload.single('image'), createEvent);
router.put('/:id', authenticate, upload.single('image'), updateEvent);
router.delete('/:id', authenticate, deleteEvent);

module.exports = router;


