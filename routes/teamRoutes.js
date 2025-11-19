const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const { authenticate } = require('../middleware/auth');
const {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} = require('../controllers/teamController');

// Public routes
router.get('/', getAllTeamMembers);
router.get('/:id', getTeamMemberById);

// Protected routes (admin only)
router.post('/', authenticate, upload.single('picture'), createTeamMember);
router.put('/:id', authenticate, upload.single('picture'), updateTeamMember);
router.delete('/:id', authenticate, deleteTeamMember);

module.exports = router;

