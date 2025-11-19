const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const { authenticate } = require('../middleware/auth');
const {
  getAllRequests,
  getRequestById,
  createRequest,
  approveRequest,
  rejectRequest,
  getMembers,
  updateMember,
  deleteMember
} = require('../controllers/membershipController');

// Public routes
router.post('/', upload.single('receipt'), createRequest);

// Protected routes (admin only)
router.get('/requests', authenticate, getAllRequests);
router.get('/requests/:id', authenticate, getRequestById);
router.put('/requests/:id/approve', authenticate, approveRequest);
router.put('/requests/:id/reject', authenticate, rejectRequest);
router.get('/members', authenticate, getMembers);
router.put('/members/:id', authenticate, updateMember);
router.delete('/members/:id', authenticate, deleteMember);

module.exports = router;


