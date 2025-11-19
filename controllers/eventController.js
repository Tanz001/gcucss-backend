const pool = require('../config/database');
const path = require('path');

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const [events] = await pool.execute(`
      SELECT e.*, a.name as created_by_name 
      FROM events e 
      LEFT JOIN admins a ON e.created_by = a.admin_id 
      ORDER BY e.created_at DESC
    `);

    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events',
      error: error.message
    });
  }
};

// Get single event
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const [events] = await pool.execute(`
      SELECT e.*, a.name as created_by_name 
      FROM events e 
      LEFT JOIN admins a ON e.created_by = a.admin_id 
      WHERE e.event_id = ?
    `, [id]);

    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      data: events[0]
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event',
      error: error.message
    });
  }
};

// Create event
const createEvent = async (req, res) => {
  try {
    const { title, description, location, date, time, type } = req.body;
    const adminId = req.admin.admin_id;

    if (!title || !description || !date || !type) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, date, and type are required'
      });
    }

    // Handle image upload
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/assets/events/${req.file.filename}`;
    } else if (req.body.image_url) {
      imageUrl = req.body.image_url;
    }

    const [result] = await pool.execute(`
      INSERT INTO events (title, description, location, date, time, type, image_url, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [title, description, location || null, date, time || null, type, imageUrl, adminId]);

    const [newEvent] = await pool.execute(`
      SELECT e.*, a.name as created_by_name 
      FROM events e 
      LEFT JOIN admins a ON e.created_by = a.admin_id 
      WHERE e.event_id = ?
    `, [result.insertId]);

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: newEvent[0]
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: error.message
    });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, date, time, type } = req.body;

    // Check if event exists
    const [events] = await pool.execute('SELECT * FROM events WHERE event_id = ?', [id]);
    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Handle image upload
    let imageUrl = events[0].image_url; // Keep existing if no new image
    if (req.file) {
      imageUrl = `/assets/events/${req.file.filename}`;
    } else if (req.body.image_url) {
      imageUrl = req.body.image_url;
    }

    await pool.execute(`
      UPDATE events 
      SET title = ?, description = ?, location = ?, date = ?, time = ?, type = ?, image_url = ?
      WHERE event_id = ?
    `, [title, description, location || null, date, time || null, type, imageUrl, id]);

    const [updatedEvent] = await pool.execute(`
      SELECT e.*, a.name as created_by_name 
      FROM events e 
      LEFT JOIN admins a ON e.created_by = a.admin_id 
      WHERE e.event_id = ?
    `, [id]);

    res.json({
      success: true,
      message: 'Event updated successfully',
      data: updatedEvent[0]
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update event',
      error: error.message
    });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const [events] = await pool.execute('SELECT * FROM events WHERE event_id = ?', [id]);
    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    await pool.execute('DELETE FROM events WHERE event_id = ?', [id]);

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete event',
      error: error.message
    });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};


