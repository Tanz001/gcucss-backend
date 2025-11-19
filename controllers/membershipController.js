const pool = require('../config/database');
const path = require('path');

// Get all membership requests
const getAllRequests = async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = 'SELECT * FROM membership_requests ORDER BY created_at DESC';
    let params = [];

    if (status) {
      query = 'SELECT * FROM membership_requests WHERE status = ? ORDER BY created_at DESC';
      params = [status];
    }

    const [requests] = await pool.execute(query, params);

    res.json({
      success: true,
      data: requests
    });
  } catch (error) {
    console.error('Get membership requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch membership requests',
      error: error.message
    });
  }
};

// Get single membership request
const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const [requests] = await pool.execute(
      'SELECT * FROM membership_requests WHERE request_id = ?',
      [id]
    );

    if (requests.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Membership request not found'
      });
    }

    res.json({
      success: true,
      data: requests[0]
    });
  } catch (error) {
    console.error('Get membership request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch membership request',
      error: error.message
    });
  }
};

// Create membership request (public endpoint)
const createRequest = async (req, res) => {
  try {
    const { name, email, phone_number, department, semester, account_name } = req.body;

    if (!name || !email || !phone_number || !department) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone number, and department are required'
      });
    }

    // Handle receipt upload
    let receiptUrl = null;
    if (req.file) {
      receiptUrl = `/assets/receipts/${req.file.filename}`;
    }

    const [result] = await pool.execute(`
      INSERT INTO membership_requests (name, email, phone_number, department, semester, account_name, receipt_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [name, email, phone_number, department, semester || null, account_name || null, receiptUrl]);

    const [newRequest] = await pool.execute(
      'SELECT * FROM membership_requests WHERE request_id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Membership request submitted successfully',
      data: newRequest[0]
    });
  } catch (error) {
    console.error('Create membership request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit membership request',
      error: error.message
    });
  }
};

// Approve membership request
const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const [requests] = await pool.execute(
      'SELECT * FROM membership_requests WHERE request_id = ?',
      [id]
    );

    if (requests.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Membership request not found'
      });
    }

    await pool.execute(
      'UPDATE membership_requests SET status = ? WHERE request_id = ?',
      ['approved', id]
    );

    const [updatedRequest] = await pool.execute(
      'SELECT * FROM membership_requests WHERE request_id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Membership request approved successfully',
      data: updatedRequest[0]
    });
  } catch (error) {
    console.error('Approve request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve membership request',
      error: error.message
    });
  }
};

// Reject membership request
const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const [requests] = await pool.execute(
      'SELECT * FROM membership_requests WHERE request_id = ?',
      [id]
    );

    if (requests.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Membership request not found'
      });
    }

    await pool.execute(
      'UPDATE membership_requests SET status = ? WHERE request_id = ?',
      ['rejected', id]
    );

    const [updatedRequest] = await pool.execute(
      'SELECT * FROM membership_requests WHERE request_id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Membership request rejected successfully',
      data: updatedRequest[0]
    });
  } catch (error) {
    console.error('Reject request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reject membership request',
      error: error.message
    });
  }
};

// Get all approved members
const getMembers = async (req, res) => {
  try {
    const [members] = await pool.execute(`
      SELECT request_id, name, email, phone_number, department, semester, created_at as joined_at
      FROM membership_requests 
      WHERE status = 'approved'
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: members
    });
  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch members',
      error: error.message
    });
  }
};

// Update member (update membership request)
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone_number, department, semester } = req.body;

    const [requests] = await pool.execute(
      'SELECT * FROM membership_requests WHERE request_id = ? AND status = ?',
      [id, 'approved']
    );

    if (requests.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    await pool.execute(`
      UPDATE membership_requests 
      SET name = ?, email = ?, phone_number = ?, department = ?, semester = ?
      WHERE request_id = ? AND status = 'approved'
    `, [name, email, phone_number, department, semester || null, id]);

    const [updatedMember] = await pool.execute(
      'SELECT * FROM membership_requests WHERE request_id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Member updated successfully',
      data: updatedMember[0]
    });
  } catch (error) {
    console.error('Update member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update member',
      error: error.message
    });
  }
};

// Delete member
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const [requests] = await pool.execute(
      'SELECT * FROM membership_requests WHERE request_id = ? AND status = ?',
      [id, 'approved']
    );

    if (requests.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    await pool.execute(
      'UPDATE membership_requests SET status = ? WHERE request_id = ?',
      ['rejected', id]
    );

    res.json({
      success: true,
      message: 'Member deleted successfully'
    });
  } catch (error) {
    console.error('Delete member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete member',
      error: error.message
    });
  }
};

module.exports = {
  getAllRequests,
  getRequestById,
  createRequest,
  approveRequest,
  rejectRequest,
  getMembers,
  updateMember,
  deleteMember
};


