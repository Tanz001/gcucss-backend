# GCU CSS Backend API

Backend API for GCU Computer Science Society website.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   - Copy `.env` file and update database credentials
   - Update JWT_SECRET with a secure random string

3. **Database Setup**
   - Create database: `CREATE DATABASE css;`
   - Run the SQL schema provided to create tables

4. **Start Server**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get admin profile (protected)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (protected)
- `PUT /api/events/:id` - Update event (protected)
- `DELETE /api/events/:id` - Delete event (protected)

### Membership
- `POST /api/membership` - Submit membership request (public)
- `GET /api/membership/requests` - Get all requests (protected)
- `GET /api/membership/requests/:id` - Get request by ID (protected)
- `PUT /api/membership/requests/:id/approve` - Approve request (protected)
- `PUT /api/membership/requests/:id/reject` - Reject request (protected)
- `GET /api/membership/members` - Get all members (protected)
- `PUT /api/membership/members/:id` - Update member (protected)
- `DELETE /api/membership/members/:id` - Delete member (protected)

### News
- `GET /api/news` - Get all news
- `GET /api/news/:id` - Get news by ID
- `POST /api/news` - Create news (protected)
- `PUT /api/news/:id` - Update news (protected)
- `DELETE /api/news/:id` - Delete news (protected)

### Announcements
- `GET /api/announcements` - Get all announcements
- `GET /api/announcements/:id` - Get announcement by ID
- `POST /api/announcements` - Create announcement (protected)
- `PUT /api/announcements/:id` - Update announcement (protected)
- `DELETE /api/announcements/:id` - Delete announcement (protected)

### Executive Team
- `GET /api/team` - Get all team members
- `GET /api/team/:id` - Get team member by ID
- `POST /api/team` - Add team member (protected)
- `PUT /api/team/:id` - Update team member (protected)
- `DELETE /api/team/:id` - Delete team member (protected)

### Event Requests
- `POST /api/event-requests` - Register for event (public)
- `GET /api/event-requests` - Get all event requests (protected)
- `DELETE /api/event-requests/:id` - Delete event request (protected)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (protected)

## File Upload

Files are uploaded to category-wise folders:
- `assets/events/` - Event images
- `assets/news/` - News images
- `assets/announcements/` - Announcement images
- `assets/team/` - Team member pictures
- `assets/receipts/` - Membership payment receipts
- `assets/membership/` - Other membership files

## Authentication

Protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

## Database Configuration

Update `.env` file with your MySQL credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=css
DB_PORT=3306
```



