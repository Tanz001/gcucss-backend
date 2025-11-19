const pool = require('../config/database');

// Get all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const [announcements] = await pool.execute(
      'SELECT * FROM announcements ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      data: announcements
    });
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch announcements',
      error: error.message
    });
  }
};

// Get single announcement
const getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;

    const [announcements] = await pool.execute(
      'SELECT * FROM announcements WHERE announcement_id = ?',
      [id]
    );

    if (announcements.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    res.json({
      success: true,
      data: announcements[0]
    });
  } catch (error) {
    console.error('Get announcement error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch announcement',
      error: error.message
    });
  }
};

// Create announcement
const createAnnouncement = async (req, res) => {
  try {
    const { title, content, date } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    // Handle image upload
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/assets/announcements/${req.file.filename}`;
    } else if (req.body.image_url) {
      imageUrl = req.body.image_url;
    }

    const [result] = await pool.execute(`
      INSERT INTO announcements (title, content, date, image_url)
      VALUES (?, ?, ?, ?)
    `, [title, content, date || null, imageUrl]);

    const [newAnnouncement] = await pool.execute(
      'SELECT * FROM announcements WHERE announcement_id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      data: newAnnouncement[0]
    });
  } catch (error) {
    console.error('Create announcement error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create announcement',
      error: error.message
    });
  }
};

// Update announcement
const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, date } = req.body;

    const [announcements] = await pool.execute(
      'SELECT * FROM announcements WHERE announcement_id = ?',
      [id]
    );
    if (announcements.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    // Handle image upload
    let imageUrl = announcements[0].image_url; // Keep existing if no new image
    if (req.file) {
      imageUrl = `/assets/announcements/${req.file.filename}`;
    } else if (req.body.image_url) {
      imageUrl = req.body.image_url;
    }

    await pool.execute(`
      UPDATE announcements 
      SET title = ?, content = ?, date = ?, image_url = ?
      WHERE announcement_id = ?
    `, [title, content, date || null, imageUrl, id]);

    const [updatedAnnouncement] = await pool.execute(
      'SELECT * FROM announcements WHERE announcement_id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Announcement updated successfully',
      data: updatedAnnouncement[0]
    });
  } catch (error) {
    console.error('Update announcement error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update announcement',
      error: error.message
    });
  }
};

// Delete announcement
const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const [announcements] = await pool.execute(
      'SELECT * FROM announcements WHERE announcement_id = ?',
      [id]
    );
    if (announcements.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    await pool.execute('DELETE FROM announcements WHERE announcement_id = ?', [id]);

    res.json({
      success: true,
      message: 'Announcement deleted successfully'
    });
  } catch (error) {
    console.error('Delete announcement error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete announcement',
      error: error.message
    });
  }
};

module.exports = {
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
};


