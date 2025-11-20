const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const { authenticate } = require('../middleware/auth');
const {
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} = require('../controllers/announcementController');

// Public routes
router.get('/', getAllAnnouncements);
router.get('/:id', getAnnouncementById);

// Protected routes (admin only)
router.post('/', authenticate, upload.single('image'), createAnnouncement);
router.put('/:id', authenticate, upload.single('image'), updateAnnouncement);
router.delete('/:id', authenticate, deleteAnnouncement);

module.exports = router;




