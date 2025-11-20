-- Create database
CREATE DATABASE IF NOT EXISTS css;
USE css;

-- -----------------------------------------
-- 1. Admins Table
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS admins (
    admin_id        INT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    email           VARCHAR(150) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    role            ENUM('superadmin', 'admin') DEFAULT 'admin',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------
-- 2. Events Table
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS events (
    event_id        INT AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(255) NOT NULL,
    description     TEXT NOT NULL,
    location        VARCHAR(255),
    date            DATE NOT NULL,
    time            TIME,
    type            ENUM('regular', 'flagship') NOT NULL,
    image_url       VARCHAR(500),
    created_by      INT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES admins(admin_id)
);

-- -----------------------------------------
-- 3. Membership Requests
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS membership_requests (
    request_id      INT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    email           VARCHAR(150) NOT NULL,
    phone_number    VARCHAR(20),
    department      VARCHAR(100),
    semester        VARCHAR(20),
    account_name    VARCHAR(150),        -- account holder name
    receipt_url     VARCHAR(500),        -- picture / screenshot url
    status          ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------
-- 4. Event Requests (students requesting to join event)
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS event_requests (
    request_id      INT AUTO_INCREMENT PRIMARY KEY,
    event_id        INT,
    name            VARCHAR(150) NOT NULL,
    email           VARCHAR(150),
    department      VARCHAR(100),
    semester        VARCHAR(50),
    phone_number    VARCHAR(20),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
);

-- -----------------------------------------
-- 5. News Table
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS news (
    news_id         INT AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(255) NOT NULL,
    content         TEXT NOT NULL,
    image_url       VARCHAR(500),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------
-- 6. Executive Team Table
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS executive_team (
    member_id       INT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    designation     VARCHAR(100) NOT NULL,
    linkedin_url    VARCHAR(255),
    picture_url     VARCHAR(500),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------
-- 7. Announcements Table
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS announcements (
    announcement_id INT AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(255) NOT NULL,
    content         TEXT NOT NULL,
    date            DATE,
    image_url       VARCHAR(500),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



