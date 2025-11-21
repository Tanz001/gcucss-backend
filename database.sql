CREATE DATABASE  IF NOT EXISTS `css` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `css`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: css
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('superadmin','admin') DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'Tanzeel Qaiser','admin@css.gcu.edu.pk','admin123','admin','2025-11-18 16:14:05');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements` (
  `announcement_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `date` date DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`announcement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
INSERT INTO `announcements` VALUES (1,'Tech Takra Result','we will announce the reults soon','2025-11-20',NULL,'2025-11-18 16:34:17'),(4,'Volunteers Required for Upcoming Hackathon','We are looking for volunteers to help organize our upcoming HackFest 2025. Volunteers will receive certificates, event T-shirts, and priority consideration for future leadership roles.','2025-11-28','/assets/announcements/news2-1763676547737-435830915.jpg','2025-11-20 22:09:07');
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_requests`
--

DROP TABLE IF EXISTS `event_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `event_id` int DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `semester` varchar(50) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`request_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `event_requests_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_requests`
--

LOCK TABLES `event_requests` WRITE;
/*!40000 ALTER TABLE `event_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `time` time DEFAULT NULL,
  `type` enum('regular','flagship') NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`event_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `admins` (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (4,'TechTalk: Evolution of Artificial Intelligence','Join us for an insightful TechTalk on the evolution of Artificial Intelligence, covering how AI has transformed from rule-based systems to modern deep learning models. The session will discuss real-world applications, career opportunities, and future trends. Open for all students, especially those interested in ML, data science, and automation.','Main Lab','2025-11-25',NULL,'regular','/assets/events/event1-1763676421396-395239352.jpg',1,'2025-11-20 22:07:01','2025-11-20 22:07:01'),(5,'Web Dev Bootcamp 2025 – From Zero to Advanced','This hands-on bootcamp will take students from HTML basics to advanced full-stack development using React, Node.js, and MongoDB. Participants will build real-world projects and receive completion certificates. No prior experience required—just passion and curiosity!','PG Lab','2025-11-04',NULL,'flagship','/assets/events/event2-1763676460287-898930174.png',1,'2025-11-20 22:07:40','2025-11-20 22:07:40');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `executive_team`
--

DROP TABLE IF EXISTS `executive_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `executive_team` (
  `member_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `linkedin_url` varchar(255) DEFAULT NULL,
  `picture_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `executive_team`
--

LOCK TABLES `executive_team` WRITE;
/*!40000 ALTER TABLE `executive_team` DISABLE KEYS */;
INSERT INTO `executive_team` VALUES (4,'Tanzeel Qaiser','Developer','https://tanzeelqaiser.vercel.app/','/assets/team/iqbal-1763676183389-761348617.jfif','2025-11-20 22:03:03'),(5,'Usman Akhtar','President','https://tanzeelqaiser.vercel.app/','/assets/team/WhatsApp Image 2025-09-03 at 12.55.25 PM-1763676201462-355059115.jpeg','2025-11-20 22:03:21');
/*!40000 ALTER TABLE `executive_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membership_requests`
--

DROP TABLE IF EXISTS `membership_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membership_requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `semester` varchar(20) DEFAULT NULL,
  `account_name` varchar(150) DEFAULT NULL,
  `receipt_url` varchar(500) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`request_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membership_requests`
--

LOCK TABLES `membership_requests` WRITE;
/*!40000 ALTER TABLE `membership_requests` DISABLE KEYS */;
INSERT INTO `membership_requests` VALUES (1,'Zain Amir','zain@gmail.com','03034567876','CS 5th','CS 5th','Zain','/assets/receipts/Assignment 01-1763484002940-784633933.jpg','approved','2025-11-18 16:40:02'),(2,'usman akhtar','student@gmail.com','03456787999','cs 4th','cs 4th','usman','/assets/receipts/WhatsApp Image 2025-09-14 at 12.49.51 PM-1763676679790-304348205.jpeg','pending','2025-11-20 22:11:19');
/*!40000 ALTER TABLE `membership_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `news_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`news_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (3,'Department Launches AI & Machine Learning Innovation Lab','The Department of Computer Science has officially launched its state-of-the-art AI & Machine Learning Innovation Lab, marking a major milestone in the university’s long-term technology roadmap. The new facility is equipped with high-performance GPU servers, collaborative research spaces, and an extensive collection of modern datasets for academic experimentation.\r\n\r\nFaculty members announced that the lab aims to promote student-driven research in areas such as deep learning, computer vision, natural language processing, and robotics. Through workshops, mentorship programs, and semester-long projects, students will now have direct access to industry-level tools previously available only to senior researchers.\r\n\r\nAccording to the department, the inauguration received an overwhelming response with more than 300 students registering for upcoming AI bootcamps and competitive research challenges. The lab will also host international speakers and conduct collaborative research with global institutions.\r\n\r\nThis initiative is expected to uplift the research culture within the university and empower students to engage in real-world problem-solving by leveraging artificial intelligence technologies.','/assets/news/news1-1763676495549-190975154.jpg','2025-11-20 22:08:15'),(4,'University Computer Science Society Hosts Pakistan’s Largest Hackathon','The Computer Science Society successfully organized “CodeFest 2025”, now recognized as one of Pakistan’s largest student-run hackathons with over 1,500 participants from 40+ universities nationwide. The event spanned 36 hours of continuous coding, innovative project development, and high-energy collaboration.\r\n\r\nParticipants competed in various categories, including health-tech, fintech, cybersecurity, web development, AI tools, and blockchain applications. Industry-leading judges from major tech companies evaluated the submissions, praising the creativity and technical excellence displayed by the students.\r\n\r\nThe winning team built a real-time emergency response system powered by machine learning that predicts critical events and sends intelligent alerts. Other standout projects included a voice-controlled home automation system, a blockchain-based degree verification portal, and an AI chatbot for academic assistance.\r\n\r\nThe event also featured tech talks, resume clinics, networking sessions, and startup mentorship, giving participants a comprehensive experience beyond competition. With major sponsors such as software houses, telecom companies, and startups, CodeFest 2025 set a new benchmark for student-led innovation in the region.','/assets/news/news2-1763676518424-919857173.jpg','2025-11-20 22:08:38');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-21 10:55:38
