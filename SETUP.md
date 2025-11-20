# Backend Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## Step 1: Install Dependencies

```bash
cd gcu-css-backened
npm install
```

## Step 2: Database Setup

1. **Create Database**
   ```sql
   CREATE DATABASE css;
   ```

2. **Run SQL Schema**
   - Open MySQL command line or MySQL Workbench
   - Run the SQL commands from `database.sql` file
   - Or import the file directly

3. **Create .env file**
   Create a `.env` file in the root directory with the following content:
   ```
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=P@kistan66
   DB_NAME=css
   DB_PORT=3306

   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # File Upload
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./assets
   ```

## Step 3: Create Default Admin

```bash
npm run seed
```

This will create a default admin:
- Email: `admin@css.gcu.edu.pk`
- Password: `admin123`
- Role: `superadmin`

## Step 4: Start Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## Step 5: Test API

Test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

## API Base URL

All API endpoints are prefixed with `/api`

Example:
- Login: `POST http://localhost:5000/api/auth/login`
- Get Events: `GET http://localhost:5000/api/events`

## File Upload Structure

Files are automatically organized in category-wise folders:
- `assets/events/` - Event images
- `assets/news/` - News images
- `assets/announcements/` - Announcement images
- `assets/team/` - Team member pictures
- `assets/receipts/` - Payment receipts
- `assets/membership/` - Other membership files

## Authentication

For protected routes, include JWT token in request header:
```
Authorization: Bearer <your-token>
```

## Troubleshooting

1. **Database Connection Error**
   - Check MySQL is running
   - Verify database credentials in `.env`
   - Ensure database `css` exists

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Or stop the process using port 5000

3. **File Upload Errors**
   - Ensure `assets` folder has write permissions
   - Check file size (max 5MB)



