const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure assets directory exists
const assetsDir = path.join(__dirname, '../assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Create category-wise folders
const categories = ['events', 'news', 'announcements', 'team', 'membership', 'receipts'];
categories.forEach(category => {
  const categoryDir = path.join(assetsDir, category);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }
});

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = assetsDir;
    
    // Determine folder based on route or field name
    if (req.route?.path?.includes('event')) {
      uploadPath = path.join(assetsDir, 'events');
    } else if (req.route?.path?.includes('news')) {
      uploadPath = path.join(assetsDir, 'news');
    } else if (req.route?.path?.includes('announcement')) {
      uploadPath = path.join(assetsDir, 'announcements');
    } else if (req.route?.path?.includes('team')) {
      uploadPath = path.join(assetsDir, 'team');
    } else if (file.fieldname === 'receipt') {
      uploadPath = path.join(assetsDir, 'receipts');
    } else {
      uploadPath = path.join(assetsDir, 'membership');
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: timestamp-random-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB default
  },
  fileFilter: fileFilter
});

module.exports = upload;


