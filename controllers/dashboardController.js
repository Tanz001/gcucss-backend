const pool = require('../config/database');

// Get dashboard statistics
const getStats = async (req, res) => {
  try {
    // Get total members (approved requests)
    const [membersCount] = await pool.execute(
      "SELECT COUNT(*) as count FROM membership_requests WHERE status = 'approved'"
    );

    // Get total membership requests
    const [requestsCount] = await pool.execute(
      'SELECT COUNT(*) as count FROM membership_requests'
    );

    // Get pending requests
    const [pendingCount] = await pool.execute(
      "SELECT COUNT(*) as count FROM membership_requests WHERE status = 'pending'"
    );

    // Get total events
    const [eventsCount] = await pool.execute(
      'SELECT COUNT(*) as count FROM events'
    );

    // Get total news
    const [newsCount] = await pool.execute(
      'SELECT COUNT(*) as count FROM news'
    );

    // Get total announcements
    const [announcementsCount] = await pool.execute(
      'SELECT COUNT(*) as count FROM announcements'
    );

    // Get total event requests
    const [eventRequestsCount] = await pool.execute(
      'SELECT COUNT(*) as count FROM event_requests'
    );

    res.json({
      success: true,
      data: {
        totalMembers: membersCount[0].count,
        totalMembershipRequests: requestsCount[0].count,
        pendingRequests: pendingCount[0].count,
        totalEvents: eventsCount[0].count,
        totalNews: newsCount[0].count,
        totalAnnouncements: announcementsCount[0].count,
        totalEventRequests: eventRequestsCount[0].count
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
};

module.exports = {
  getStats
};


