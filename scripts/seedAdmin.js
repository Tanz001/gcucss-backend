const pool = require('../config/database');

async function seedAdmin() {
  try {
    const name = 'Admin';
    const email = 'admin@css.gcu.edu.pk';
    const password = 'admin123';
    const role = 'superadmin';

    // Check if admin already exists
    const [existing] = await pool.execute(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      console.log('Admin already exists');
      process.exit(0);
    }

    // Insert admin with plain text password
    await pool.execute(
      'INSERT INTO admins (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role]
    );

    console.log('✅ Default admin created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();

