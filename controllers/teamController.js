const pool = require('../config/database');

// Get all team members
const getAllTeamMembers = async (req, res) => {
  try {
    const [members] = await pool.execute(
      'SELECT * FROM executive_team ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      data: members
    });
  } catch (error) {
    console.error('Get team members error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team members',
      error: error.message
    });
  }
};

// Get single team member
const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;

    const [members] = await pool.execute(
      'SELECT * FROM executive_team WHERE member_id = ?',
      [id]
    );

    if (members.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.json({
      success: true,
      data: members[0]
    });
  } catch (error) {
    console.error('Get team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team member',
      error: error.message
    });
  }
};

// Create team member
const createTeamMember = async (req, res) => {
  try {
    const { name, designation, linkedin_url } = req.body;

    if (!name || !designation) {
      return res.status(400).json({
        success: false,
        message: 'Name and designation are required'
      });
    }

    // Handle picture upload
    let pictureUrl = null;
    if (req.file) {
      pictureUrl = `/assets/team/${req.file.filename}`;
    } else if (req.body.picture_url) {
      pictureUrl = req.body.picture_url;
    }

    const [result] = await pool.execute(`
      INSERT INTO executive_team (name, designation, linkedin_url, picture_url)
      VALUES (?, ?, ?, ?)
    `, [name, designation, linkedin_url || null, pictureUrl]);

    const [newMember] = await pool.execute(
      'SELECT * FROM executive_team WHERE member_id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Team member added successfully',
      data: newMember[0]
    });
  } catch (error) {
    console.error('Create team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add team member',
      error: error.message
    });
  }
};

// Update team member
const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, linkedin_url } = req.body;

    const [members] = await pool.execute(
      'SELECT * FROM executive_team WHERE member_id = ?',
      [id]
    );
    if (members.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    // Handle picture upload
    let pictureUrl = members[0].picture_url; // Keep existing if no new image
    if (req.file) {
      pictureUrl = `/assets/team/${req.file.filename}`;
    } else if (req.body.picture_url) {
      pictureUrl = req.body.picture_url;
    }

    await pool.execute(`
      UPDATE executive_team 
      SET name = ?, designation = ?, linkedin_url = ?, picture_url = ?
      WHERE member_id = ?
    `, [name, designation, linkedin_url || null, pictureUrl, id]);

    const [updatedMember] = await pool.execute(
      'SELECT * FROM executive_team WHERE member_id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Team member updated successfully',
      data: updatedMember[0]
    });
  } catch (error) {
    console.error('Update team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update team member',
      error: error.message
    });
  }
};

// Delete team member
const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const [members] = await pool.execute(
      'SELECT * FROM executive_team WHERE member_id = ?',
      [id]
    );
    if (members.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    await pool.execute('DELETE FROM executive_team WHERE member_id = ?', [id]);

    res.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    console.error('Delete team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete team member',
      error: error.message
    });
  }
};

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
};


