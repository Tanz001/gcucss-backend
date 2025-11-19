const pool = require('../config/database');

// Get all news
const getAllNews = async (req, res) => {
  try {
    const [news] = await pool.execute(
      'SELECT * FROM news ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      data: news
    });
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news',
      error: error.message
    });
  }
};

// Get single news
const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const [news] = await pool.execute(
      'SELECT * FROM news WHERE news_id = ?',
      [id]
    );

    if (news.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    res.json({
      success: true,
      data: news[0]
    });
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news',
      error: error.message
    });
  }
};

// Create news
const createNews = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    // Handle image upload
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/assets/news/${req.file.filename}`;
    } else if (req.body.image_url) {
      imageUrl = req.body.image_url;
    }

    const [result] = await pool.execute(`
      INSERT INTO news (title, content, image_url)
      VALUES (?, ?, ?)
    `, [title, content, imageUrl]);

    const [newNews] = await pool.execute(
      'SELECT * FROM news WHERE news_id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'News created successfully',
      data: newNews[0]
    });
  } catch (error) {
    console.error('Create news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create news',
      error: error.message
    });
  }
};

// Update news
const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const [news] = await pool.execute('SELECT * FROM news WHERE news_id = ?', [id]);
    if (news.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    // Handle image upload
    let imageUrl = news[0].image_url; // Keep existing if no new image
    if (req.file) {
      imageUrl = `/assets/news/${req.file.filename}`;
    } else if (req.body.image_url) {
      imageUrl = req.body.image_url;
    }

    await pool.execute(`
      UPDATE news 
      SET title = ?, content = ?, image_url = ?
      WHERE news_id = ?
    `, [title, content, imageUrl, id]);

    const [updatedNews] = await pool.execute(
      'SELECT * FROM news WHERE news_id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'News updated successfully',
      data: updatedNews[0]
    });
  } catch (error) {
    console.error('Update news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update news',
      error: error.message
    });
  }
};

// Delete news
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const [news] = await pool.execute('SELECT * FROM news WHERE news_id = ?', [id]);
    if (news.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    await pool.execute('DELETE FROM news WHERE news_id = ?', [id]);

    res.json({
      success: true,
      message: 'News deleted successfully'
    });
  } catch (error) {
    console.error('Delete news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete news',
      error: error.message
    });
  }
};

module.exports = {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
};


