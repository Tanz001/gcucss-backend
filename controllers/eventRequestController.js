const pool = require('../config/database');

// Get all event requests
const getAllEventRequests = async (req, res) => {
  try {
    const { event_id } = req.query;
    
    let query = `
      SELECT er.*, e.title as event_title 
      FROM event_requests er 
      LEFT JOIN events e ON er.event_id = e.event_id 
      ORDER BY er.created_at DESC
    `;
    let params = [];

    if (event_id) {
      query = `
        SELECT er.*, e.title as event_title 
        FROM event_requests er 
        LEFT JOIN events e ON er.event_id = e.event_id 
        WHERE er.event_id = ?
        ORDER BY er.created_at DESC
      `;
      params = [event_id];
    }

    const [requests] = await pool.execute(query, params);

    res.json({
      success: true,
      data: requests
    });
  } catch (error) {
    console.error('Get event requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event requests',
      error: error.message
    });
  }
};

// Create event request (public endpoint)
const createEventRequest = async (req, res) => {
  try {
    const { event_id, name, email, department, semester, phone_number } = req.body;

    if (!event_id || !name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Event ID, name, and email are required'
      });
    }

    // Check if event exists
    const [events] = await pool.execute('SELECT * FROM events WHERE event_id = ?', [event_id]);
    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const [result] = await pool.execute(`
      INSERT INTO event_requests (event_id, name, email, department, semester, phone_number)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [event_id, name, email, department || null, semester || null, phone_number || null]);

    const [newRequest] = await pool.execute(
      'SELECT er.*, e.title as event_title FROM event_requests er LEFT JOIN events e ON er.event_id = e.event_id WHERE er.request_id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Event registration submitted successfully',
      data: newRequest[0]
    });
  } catch (error) {
    console.error('Create event request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit event registration',
      error: error.message
    });
  }
};

// Delete event request
const deleteEventRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const [requests] = await pool.execute(
      'SELECT * FROM event_requests WHERE request_id = ?',
      [id]
    );
    if (requests.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event request not found'
      });
    }

    await pool.execute('DELETE FROM event_requests WHERE request_id = ?', [id]);

    res.json({
      success: true,
      message: 'Event request deleted successfully'
    });
  } catch (error) {
    console.error('Delete event request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete event request',
      error: error.message
    });
  }
};

module.exports = {
  getAllEventRequests,
  createEventRequest,
  deleteEventRequest
};


