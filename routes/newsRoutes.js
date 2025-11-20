const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const { authenticate } = require('../middleware/auth');
const {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} = require('../controllers/newsController');

// Public routes
router.get('/', getAllNews);
router.get('/:id', getNewsById);

// Protected routes (admin only)
router.post('/', authenticate, upload.single('image'), createNews);
router.put('/:id', authenticate, upload.single('image'), updateNews);
router.delete('/:id', authenticate, deleteNews);

module.exports = router;

