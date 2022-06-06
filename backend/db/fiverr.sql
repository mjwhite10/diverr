-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: fiverr
-- ------------------------------------------------------
-- Server version	8.0.29
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8mb4 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;
DROP SCHEMA IF EXISTS fiverr;
CREATE DATABASE fiverr;
USE fiverr;
--
-- Table structure for table `services`
--
DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUser` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `info` varchar(500) NOT NULL,
  `file` varchar(100) DEFAULT NULL,
  `idStatus` int NOT NULL,
  `idCategory` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `modifiedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idStatus` (`idStatus`),
  KEY `idCategory` (`idCategory`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`),
  CONSTRAINT `services_ibfk_2` FOREIGN KEY (`idStatus`) REFERENCES `services_status` (`id`),
  CONSTRAINT `services_ibfk_3` FOREIGN KEY (`idCategory`) REFERENCES `services_categories` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `services`
--
LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */
;
INSERT INTO `services`
VALUES (
    1,
    5,
    'maiores',
    'Omnis sunt aut natus et et vel deserunt.',
    'e7c70e1d-b0ea-4f7d-bebb-31d8ed8b4a33.txt',
    2,
    3,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    2,
    1,
    'commodi',
    'Soluta in aut ducimus autem itaque excepturi.',
    '79eaf86c-6a8c-4d6c-8f84-4364175649c2.docx',
    2,
    5,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    3,
    2,
    'in',
    'Voluptates iste sapiente voluptas in est qui.',
    '265429e9-683f-415e-82f7-80ca75c8ac23.docx',
    2,
    5,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    4,
    12,
    'nobis',
    'Fuga voluptatem sunt qui id cupiditate rem commodi.',
    'f09a141b-56d4-451a-a4f8-54a778e33ef6.txt',
    2,
    1,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    5,
    8,
    'labore',
    'Illo dolores fuga.',
    '44d7d434-7491-46e4-bca6-9392b2a88603.txt',
    2,
    1,
    '2022-05-03 10:20:31',
    NULL
  );
/*!40000 ALTER TABLE `services` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `services_categories`
--
DROP TABLE IF EXISTS `services_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `services_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `services_categories`
--
LOCK TABLES `services_categories` WRITE;
/*!40000 ALTER TABLE `services_categories` DISABLE KEYS */
;
INSERT INTO `services_categories`
VALUES (1, 'Graphic arts and design'),
  (2, 'Digital marketing'),
  (3, 'Writing and translation'),
  (4, 'Video and animation'),
  (5, 'Music and sound'),
  (6, 'Programming and technology'),
  (7, 'Business'),
  (8, 'Lifestyle'),
  (9, 'Trends');
/*!40000 ALTER TABLE `services_categories` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `services_comments`
--
DROP TABLE IF EXISTS `services_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `services_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(280) NOT NULL,
  `idUser` int NOT NULL,
  `idService` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `modifiedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idService` (`idService`),
  CONSTRAINT `services_comments_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`),
  CONSTRAINT `services_comments_ibfk_2` FOREIGN KEY (`idService`) REFERENCES `services` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 76 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `services_comments`
--
LOCK TABLES `services_comments` WRITE;
/*!40000 ALTER TABLE `services_comments` DISABLE KEYS */
;
INSERT INTO `services_comments`
VALUES (
    1,
    'Voluptates ut magni est et qui aut.',
    11,
    1,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    2,
    'Mollitia dolorum quia.',
    5,
    1,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    3,
    'Et omnis impedit eum.',
    11,
    1,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    4,
    'Deserunt amet debitis autem nihil est quae accusantium totam.',
    8,
    1,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    5,
    'Voluptatem nulla deserunt dolores.',
    11,
    1,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    6,
    'Sed distinctio assumenda.',
    7,
    1,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    7,
    'Nihil eos deleniti tenetur repellat.',
    10,
    1,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    8,
    'Autem ut veritatis.',
    6,
    1,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    9,
    'Provident repellat ducimus consequatur.',
    9,
    1,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    10,
    'Occaecati temporibus quidem ut atque.',
    12,
    1,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    11,
    'Distinctio in ut deserunt et ad nemo.',
    6,
    1,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    12,
    'In beatae omnis officia vero dolorum.',
    11,
    1,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    13,
    'Dolore esse omnis.',
    2,
    1,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    14,
    'Tempore dolores omnis et amet eligendi.',
    12,
    1,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    15,
    'Ullam laudantium minus.',
    9,
    1,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    16,
    'Quis repudiandae officiis quos et repellat est at.',
    4,
    2,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    17,
    'Dolores atque commodi molestiae.',
    1,
    2,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    18,
    'Culpa suscipit quibusdam molestiae culpa eaque natus qui.',
    6,
    2,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    19,
    'Aperiam est corrupti exercitationem nesciunt ea eligendi.',
    10,
    2,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    20,
    'Beatae vero ducimus non molestiae rerum tempora adipisci.',
    6,
    2,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    21,
    'Sit temporibus illum cumque voluptatibus molestiae voluptatum autem.',
    11,
    2,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    22,
    'Possimus magni esse sed porro voluptatem sequi velit consequuntur modi.',
    5,
    2,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    23,
    'Totam neque illum aliquam dolores et repudiandae.',
    1,
    2,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    24,
    'Modi voluptatum laborum distinctio.',
    9,
    2,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    25,
    'Voluptatum ad aperiam incidunt.',
    6,
    2,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    26,
    'Excepturi quidem repudiandae eum dignissimos recusandae consequuntur.',
    4,
    2,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    27,
    'Distinctio beatae accusamus itaque atque odit aliquid maiores.',
    8,
    2,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    28,
    'Perferendis accusantium consectetur et fuga.',
    10,
    2,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    29,
    'Perspiciatis ex fugiat harum aut aperiam.',
    4,
    2,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    30,
    'Omnis repellat exercitationem impedit placeat est.',
    5,
    2,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    31,
    'Eligendi dolor eos et rerum neque.',
    12,
    3,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    32,
    'Qui enim cum fugiat occaecati cupiditate.',
    11,
    3,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    33,
    'Corporis nihil totam ex nihil excepturi.',
    11,
    3,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    34,
    'Expedita reprehenderit delectus.',
    11,
    3,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    35,
    'Impedit perferendis nesciunt sit.',
    11,
    3,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    36,
    'Cum suscipit neque est sit et.',
    9,
    3,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    37,
    'Modi molestias quam provident molestiae nihil dolores repellat aut ipsum.',
    6,
    3,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    38,
    'Hic eum necessitatibus iste.',
    4,
    3,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    39,
    'Ut itaque perspiciatis eius facere qui cum ipsum rerum unde.',
    3,
    3,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    40,
    'Itaque quis voluptatum cum at autem modi sed accusamus.',
    6,
    3,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    41,
    'Quo in deserunt dicta fugiat et minus consequatur nulla ut.',
    1,
    3,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    42,
    'Exercitationem aut voluptatem quis.',
    2,
    3,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    43,
    'Rerum ut consequuntur doloribus eaque nemo.',
    12,
    3,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    44,
    'Saepe eaque aut placeat vitae est quidem.',
    10,
    3,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    45,
    'Eius soluta molestias.',
    10,
    3,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    46,
    'Dolores quaerat quia aut harum ut ullam.',
    1,
    4,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    47,
    'Ut ab quasi sapiente.',
    4,
    4,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    48,
    'Earum consectetur aut aut sit numquam.',
    3,
    4,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    49,
    'Quia ut harum nihil harum.',
    2,
    4,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    50,
    'Maxime quis ad ut blanditiis delectus numquam autem.',
    2,
    4,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    51,
    'Voluptate voluptatibus veniam dignissimos nihil officia ipsa.',
    2,
    4,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    52,
    'Aliquid facilis enim aut aliquam debitis ullam blanditiis.',
    6,
    4,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    53,
    'A maxime necessitatibus fuga.',
    12,
    4,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    54,
    'Ut doloremque illo ut qui accusantium ut vitae corrupti dolor.',
    1,
    4,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    55,
    'Itaque minima ea asperiores dolorem.',
    9,
    4,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    56,
    'Atque reiciendis qui iure in id pariatur sequi a.',
    1,
    4,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    57,
    'Velit officia eveniet asperiores ad.',
    12,
    4,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    58,
    'Iste doloremque porro blanditiis placeat quia et cum.',
    5,
    4,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    59,
    'Sit et omnis sunt porro nihil facere est aut ut.',
    1,
    4,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    60,
    'Veniam hic molestias laudantium inventore sequi veritatis quasi.',
    9,
    4,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    61,
    'Sunt maxime eaque voluptatem.',
    6,
    5,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    62,
    'Harum hic est vitae quo officia saepe error quam facilis.',
    3,
    5,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    63,
    'Eos fuga voluptatem iste.',
    7,
    5,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    64,
    'Facere ut sit quo omnis qui iste esse.',
    3,
    5,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    65,
    'Ut nobis eveniet vitae autem repudiandae dolorum mollitia aliquid.',
    3,
    5,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    66,
    'Odio sequi quia impedit deserunt nesciunt et earum.',
    3,
    5,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    67,
    'Distinctio dolor eveniet dolores quas eum id veritatis.',
    4,
    5,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    68,
    'Cum ut dignissimos qui.',
    4,
    5,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    69,
    'Et omnis repellendus rem sit sunt nam natus quos ut.',
    2,
    5,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    70,
    'Nobis provident quaerat quasi non nihil sed.',
    4,
    5,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    71,
    'Dolorem qui rerum vel minima delectus repudiandae in.',
    3,
    5,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    72,
    'Dolor rerum eum harum similique fugiat laudantium ut numquam sed.',
    7,
    5,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    73,
    'Dolor rerum molestiae rem quasi ut.',
    7,
    5,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    74,
    'Ducimus architecto architecto sequi praesentium et.',
    1,
    5,
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    75,
    'Molestiae ut illo omnis sit.',
    8,
    5,
    '2022-05-03 10:20:31',
    NULL
  );
/*!40000 ALTER TABLE `services_comments` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `services_solution`
--
DROP TABLE IF EXISTS `services_solution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `services_solution` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idService` int NOT NULL,
  `idUser` int NOT NULL,
  `file` varchar(100) DEFAULT NULL,
  `startedAt` datetime NOT NULL,
  `finishedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idService` (`idService`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `services_solution_ibfk_1` FOREIGN KEY (`idService`) REFERENCES `services` (`id`),
  CONSTRAINT `services_solution_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `services_solution`
--
LOCK TABLES `services_solution` WRITE;
/*!40000 ALTER TABLE `services_solution` DISABLE KEYS */
;
INSERT INTO `services_solution`
VALUES (
    1,
    1,
    7,
    'd13815b6-1ed6-42a5-b7f2-6c9bd67c1861.txt',
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    2,
    2,
    3,
    '209f249e-460b-4853-a3cb-170fec489d1f.txt',
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    3,
    3,
    3,
    'a0f56b3a-c89c-43a1-b91c-cd375247ed3e.txt',
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    4,
    4,
    3,
    '6a42a7e8-a8ba-4f9d-907b-e248f9032022.txt',
    '2022-05-03 10:20:31',
    NULL
  ),
  (
    5,
    5,
    5,
    'edf93e5c-fce0-43cd-8c3b-ff54803b1a9e.docx',
    '2022-05-03 10:20:31',
    NULL
  );
/*!40000 ALTER TABLE `services_solution` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `services_status`
--
DROP TABLE IF EXISTS `services_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `services_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `services_status`
--
LOCK TABLES `services_status` WRITE;
/*!40000 ALTER TABLE `services_status` DISABLE KEYS */
;
INSERT INTO `services_status`
VALUES (1, 'Unassigned'),
  (2, 'Assigned'),
  (3, 'Completed');
/*!40000 ALTER TABLE `services_status` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` tinytext NOT NULL,
  `role` enum('normal', 'admin') NOT NULL DEFAULT 'normal',
  `name` tinytext NOT NULL,
  `bio` varchar(500) DEFAULT NULL,
  `avatar` tinytext,
  `createdAt` datetime NOT NULL,
  `modifiedAt` datetime DEFAULT NULL,
  `lastAuthUpdate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `users`
--
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */
;
INSERT INTO `users`
VALUES (
    1,
    'luna@hackaboss.com',
    '$2b$08$QhaoP/slOWSG1deOKF1WkudfX9mPqFSE9bVYezwEJ/GBJv.rqs5nO',
    'admin',
    'Luna',
    'Lorem ipsum',
    '6c7b6822-ada1-459d-a99f-f95f27321835.jpg',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31'
  ),
  (
    2,
    'manu@hackaboss.com',
    '$2b$08$QhaoP/slOWSG1deOKF1WkudfX9mPqFSE9bVYezwEJ/GBJv.rqs5nO',
    'admin',
    'Manu',
    'Lorem ipsum',
    'f115e69f-ab84-4583-a3fc-ed7c21158013.jpg',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31'
  ),
  (
    3,
    'Florencia.Palacios6@yahoo.com',
    '$2b$08$zSyO/BItbbNar1P/vazWlOcSaIXfz40EkGZmvXCyXdDXpWBvG0d3C',
    'normal',
    'Jorge Delao',
    'Deserunt eos natus aut qui eveniet sit omnis rerum. Recusandae reprehenderit nihil modi debitis. Deleniti laborum omnis quod tenetur incidunt dolores eum. Quo aliquid et quaerat necessitatibus dolor ipsa a repudiandae. Ducimus tenetur ut minima dolorem. Quia at perferendis et est velit est quibusdam voluptatem.',
    'b0a690b5-80b9-4d3d-a400-c18e364a5627.jpg',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31'
  ),
  (
    4,
    'Esteban_Olivo@yahoo.com',
    '$2b$08$4K6rrF1Y9DEHc.yd378iR.id2AQw1FCmVf/mWbybvnSzzTlMrbFwG',
    'normal',
    'Ángel Valdés MD',
    'Illum eius consequuntur quasi nihil. Doloremque ut et. Eligendi est rem eum possimus. Sapiente libero et voluptatem temporibus odio. Beatae earum consequatur aut dolor eos omnis praesentium nemo consequatur. Sunt quidem quis voluptatibus.',
    '21deab2d-fead-43ff-bb79-aa697d47fe1b.jpg',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31'
  ),
  (
    5,
    'Mnica_Griego12@gmail.com',
    '$2b$08$nuqQUbOAQEb9G808ais1/eNfHtvEH.PHLJ7HFgMbmjXldDoL7M5WG',
    'normal',
    'Roser Aguilera',
    'Dicta commodi eum dolor quia commodi magni cum. Laborum dicta rerum maxime necessitatibus animi. Optio repudiandae occaecati.',
    '8d9ac0fa-5897-4083-a863-f8eea29e94ed.jpg',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31'
  ),
  (
    6,
    'Teresa_Castillo19@gmail.com',
    '$2b$08$RXl/UHwMNZE97qCJO7E.i.hlg6RZOB7fq0Ilq7ENPl33HtlfgtgH.',
    'normal',
    'Anni Ramos',
    'Omnis blanditiis laudantium ut ipsam est illum fugiat dolore. Voluptatem tempore commodi ab et est. Saepe architecto deleniti. Officia quia ipsum id praesentium incidunt fugiat aut.',
    'ca4bdb62-c881-4bea-9be0-47201a88e74d.jpg',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31'
  ),
  (
    7,
    'Mario17@gmail.com',
    '$2b$08$awlLHK05c7IKSqpqy9vk.et8k750kUKPIzMzR/TtLPuBKDKJYX6v2',
    'normal',
    'Pedro Durán',
    'Voluptates aut illum rem repellendus. Inventore rem quas aut sit. Consequatur sequi mollitia voluptas cumque iure sit et. Quis in ex illo eveniet consequatur omnis.',
    '9b9b5dfb-41d9-4ea5-b64e-a28b2d5817c7.jpg',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31'
  ),
  (
    8,
    'Alicia18@gmail.com',
    '$2b$08$8RHoeqIo9CggXvvFvXfOFu2aAASZEbRe1z50TIbiXng2LMiR3VXsa',
    'normal',
    'Sra. Marta Vanegas',
    'Enim in perferendis velit natus animi eos laudantium velit ipsa. Optio consequatur aut voluptatem in. Laborum inventore et aliquam aperiam quaerat ipsam et in est. Ratione rerum deleniti occaecati hic nisi blanditiis iusto. Ut occaecati similique sapiente dolorum.',
    'fcac2595-edba-47d8-8423-e1160a6fcfe9.jpg',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31'
  ),
  (
    9,
    'Francisca.Segura@yahoo.com',
    '$2b$08$cgobawvMTI1aBcj7yQ4Ut.lN/oV6l5irdzQK35r3gtKpHbXixQ.9K',
    'normal',
    'Salvador Castro',
    'A qui est nihil occaecati qui quaerat voluptatem natus sit. Eum ut est sunt cumque impedit eveniet deleniti eos voluptas. Nostrum odio repellat distinctio commodi est ipsam quia.',
    '69d81061-67a5-423b-b482-a17c060ccaed.jpg',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31'
  ),
  (
    10,
    'Gregorio.Bueno@yahoo.com',
    '$2b$08$qV0m.m/h0w7PAyqyCxUjYO.5d8NqGwI34PvOLI.xRSKjPhKM7RPJW',
    'normal',
    'Miguel Menchaca',
    'Et accusantium consequuntur corporis debitis impedit qui. Omnis eum aperiam beatae reprehenderit.',
    'e2ddefe9-14b4-4cc6-a882-98f251d1439d.jpg',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31'
  ),
  (
    11,
    'Andrs_Gil94@hotmail.com',
    '$2b$08$1nvocthRaTuJFam0Esgw6Op3CHvv81ETQdN/14HVFpopV3ZZkp3Aa',
    'normal',
    'Andrea Serrato',
    'Sit ut omnis rem fugit et eos sint quis. Quo minima minima sit. Deserunt sit praesentium pariatur repudiandae. Temporibus ut sapiente deleniti modi itaque quia atque.',
    'f2309448-3b08-44f0-b7fb-0fc53c270437.jpg',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31'
  ),
  (
    12,
    'Marcela_Parra20@yahoo.com',
    '$2b$08$GEXm0kajKZPX4rrvhou2PeXsAhXZmNVL6pcBS5SDBlNHXrdXmD2va',
    'normal',
    'Sergi Polanco',
    'Qui vel odio consequatur eos. Laboriosam ut officia. Dolorem fuga aliquam quia. Laudantium tempore aut ipsam omnis delectus. Pariatur quasi libero non perferendis. Earum laudantium qui sequi est ipsum aut sed.',
    'f6b75fd9-7923-4f48-826f-8039a4cb2c23.jpg',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31',
    '2022-05-03 10:20:31'
  );
/*!40000 ALTER TABLE `users` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;
-- Dump completed on 2022-05-03 12:23:45