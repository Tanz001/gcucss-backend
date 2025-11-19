const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Verify JWT token
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Access denied.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cssgcu123');
    
    // Verify admin still exists
    const [admins] = await pool.execute(
      'SELECT admin_id, name, email, role FROM admins WHERE admin_id = ?',
      [decoded.adminId]
    );

    if (admins.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Admin not found. Access denied.'
      });
    }

    req.admin = admins[0];
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Access denied.'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: error.message
    });
  }
};

// Check if admin is superadmin
const isSuperAdmin = (req, res, next) => {
  if (req.admin.role !== 'superadmin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Superadmin privileges required.'
    });
  }
  next();
};

module.exports = { authenticate, isSuperAdmin };

