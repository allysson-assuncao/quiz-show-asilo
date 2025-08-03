CREATE DATABASE  IF NOT EXISTS `quiz_show_asilo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `quiz_show_asilo`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: quiz_show_asilo
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer` (
                          `is_correct` bit(1) NOT NULL,
                          `id` bigint NOT NULL AUTO_INCREMENT,
                          `result_id` bigint DEFAULT NULL,
                          `question_id` binary(16) DEFAULT NULL,
                          PRIMARY KEY (`id`),
                          KEY `FK8frr4bcabmmeyyu60qt7iiblo` (`question_id`),
                          KEY `FKogh77ulhbnr2xugv2581ufwfa` (`result_id`),
                          CONSTRAINT `FK8frr4bcabmmeyyu60qt7iiblo` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`),
                          CONSTRAINT `FKogh77ulhbnr2xugv2581ufwfa` FOREIGN KEY (`result_id`) REFERENCES `result` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `answer_choices`
--

DROP TABLE IF EXISTS `answer_choices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer_choices` (
                                  `answer_id` bigint NOT NULL,
                                  `choice_id` binary(16) NOT NULL,
                                  KEY `FKl2ak2xxm6mv8ir4rhtokxu2u0` (`choice_id`),
                                  KEY `FKhi2s2owqk5cokgh6x0ygu3o0k` (`answer_id`),
                                  CONSTRAINT `FKhi2s2owqk5cokgh6x0ygu3o0k` FOREIGN KEY (`answer_id`) REFERENCES `answer` (`id`),
                                  CONSTRAINT `FKl2ak2xxm6mv8ir4rhtokxu2u0` FOREIGN KEY (`choice_id`) REFERENCES `choice` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `choice`
--

DROP TABLE IF EXISTS `choice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `choice` (
                          `is_correct` tinyint(1) NOT NULL DEFAULT '0',
                          `id` binary(16) NOT NULL,
                          `question_id` binary(16) DEFAULT NULL,
                          `text` varchar(255) NOT NULL,
                          PRIMARY KEY (`id`),
                          KEY `FKcaq6r76cswke5b9fk6fyx3y5w` (`question_id`),
                          CONSTRAINT `FKcaq6r76cswke5b9fk6fyx3y5w` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
                            `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            `updated_at` datetime DEFAULT NULL,
                            `id` binary(16) NOT NULL,
                            `text` varchar(255) NOT NULL,
                            PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
                        `is_deleted` bit(1) NOT NULL,
                        `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        `id` binary(16) NOT NULL,
                        `description` varchar(255) DEFAULT NULL,
                        `title` varchar(255) NOT NULL,
                        PRIMARY KEY (`id`),
                        UNIQUE KEY `UKbbeh9l4rb2cveo62qnwmtbmif` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quiz_question`
--

DROP TABLE IF EXISTS `quiz_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_question` (
                                 `question_id` binary(16) NOT NULL,
                                 `quiz_id` binary(16) NOT NULL,
                                 PRIMARY KEY (`question_id`,`quiz_id`),
                                 KEY `FKdtynvfjgh6e7fd8l0wk37nrpc` (`quiz_id`),
                                 CONSTRAINT `FK62empq7vfu15qv1kci624f1js` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`),
                                 CONSTRAINT `FKdtynvfjgh6e7fd8l0wk37nrpc` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `result`
--

DROP TABLE IF EXISTS `result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `result` (
                          `score` double DEFAULT NULL,
                          `id` bigint NOT NULL AUTO_INCREMENT,
                          `time_start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          `time_updated` datetime(6) DEFAULT NULL,
                          `quiz_id` binary(16) DEFAULT NULL,
                          `user_id` binary(16) NOT NULL,
                          PRIMARY KEY (`id`),
                          KEY `FK25wxfk8hlyt83jaa1no4anjsg` (`quiz_id`),
                          KEY `FKkfepddltqde0pif3dlrqaupss` (`user_id`),
                          CONSTRAINT `FK25wxfk8hlyt83jaa1no4anjsg` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`),
                          CONSTRAINT `FKkfepddltqde0pif3dlrqaupss` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
                         `role` tinyint NOT NULL,
                         `id` binary(16) NOT NULL,
                         `email` varchar(255) NOT NULL,
                         `name` varchar(255) NOT NULL,
                         `password` varchar(255) NOT NULL,
                         `profile_picture_path` varchar(255) DEFAULT NULL,
                         `username` varchar(255) NOT NULL,
                         PRIMARY KEY (`id`),
                         UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
                         UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
                         CONSTRAINT `users_chk_1` CHECK ((`role` between 0 and 2))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-02 20:16:56
