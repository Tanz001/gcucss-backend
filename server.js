const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const newsRoutes = require('./routes/newsRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const teamRoutes = require('./routes/teamRoutes');
const eventRequestRoutes = require('./routes/eventRequestRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Import error handler
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from assets folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/event-requests', eventRequestRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
});

