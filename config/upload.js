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
const resolveCategory = (req, file) => {
  const pathHint = `${req.baseUrl || ''}${req.path || ''}`.toLowerCase();

  if (pathHint.includes('events')) return 'events';
  if (pathHint.includes('news')) return 'news';
  if (pathHint.includes('announcement')) return 'announcements';
  if (pathHint.includes('team')) return 'team';
  if (file.fieldname === 'receipt') return 'receipts';
  if (pathHint.includes('membership')) return 'membership';

  return 'membership';
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const category = resolveCategory(req, file);
    const uploadPath = path.join(assetsDir, category);
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


