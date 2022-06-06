-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: diverr
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `diverrs`
--
DROP SCHEMA IF EXISTS diverr;
CREATE DATABASE diverr;
USE diverr;

DROP TABLE IF EXISTS `diverrs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diverrs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUser` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `info` varchar(500) NOT NULL,
  `file` varchar(100) DEFAULT NULL,
  `picture` varchar(100) DEFAULT NULL,
  `price` double NOT NULL,
  `idStatus` int NOT NULL,
  `idCategory` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `modifiedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idStatus` (`idStatus`),
  KEY `idCategory` (`idCategory`),
  CONSTRAINT `diverrs_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`),
  CONSTRAINT `diverrs_ibfk_2` FOREIGN KEY (`idStatus`) REFERENCES `diverrs_status` (`id`),
  CONSTRAINT `diverrs_ibfk_3` FOREIGN KEY (`idCategory`) REFERENCES `diverrs_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diverrs`
--

LOCK TABLES `diverrs` WRITE;
/*!40000 ALTER TABLE `diverrs` DISABLE KEYS */;
INSERT INTO `diverrs` VALUES (1,3,'eligendi','Saepe cumque quas aperiam fugiat minus repellendus necessitatibus rerum.','7913dbb9-54ea-4882-a420-d67db50d3773.docx','4cd8685d-3d8b-4add-b8a6-980b2aea2173.jpg',283,2,1,'2022-06-06 10:54:40',NULL),(2,7,'reprehenderit','Expedita modi et quia ut.','e51fe5db-6786-472d-b6c4-49b32787851d.txt','3d7d15dc-32cd-4723-89a4-d702076b4348.jpg',855,2,4,'2022-06-06 10:54:40',NULL),(3,12,'quam','Non cupiditate consequatur cupiditate.','50f349ad-a312-4367-b4c3-e246e304070c.docx','d1ffb223-5f71-463c-9e30-061076936581.jpg',719,2,6,'2022-06-06 10:54:40',NULL),(4,10,'et','Sapiente facere labore.','0a424333-bdba-4d16-b38e-0c6e4c970014.txt','25b50c8e-7f1a-4084-90a5-eda67f260d4b.jpg',207,2,2,'2022-06-06 10:54:40',NULL),(5,6,'doloremque','Cumque qui ut et ea quia.','d09aff6a-e18b-4b13-901f-fe30bdb44724.pdf','bd39f3d2-3b30-4bee-b923-54602685d1c8.jpg',462,2,8,'2022-06-06 10:54:40',NULL);
/*!40000 ALTER TABLE `diverrs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diverrs_categories`
--

DROP TABLE IF EXISTS `diverrs_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diverrs_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diverrs_categories`
--

LOCK TABLES `diverrs_categories` WRITE;
/*!40000 ALTER TABLE `diverrs_categories` DISABLE KEYS */;
INSERT INTO `diverrs_categories` VALUES (1,'Graphic arts and design'),(2,'Digital marketing'),(3,'Writing and translation'),(4,'Video and animation'),(5,'Music and sound'),(6,'Programming and technology'),(7,'Business'),(8,'Lifestyle'),(9,'Trends');
/*!40000 ALTER TABLE `diverrs_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diverrs_comments`
--

DROP TABLE IF EXISTS `diverrs_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diverrs_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(280) NOT NULL,
  `idUser` int NOT NULL,
  `idService` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `modifiedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idService` (`idService`),
  CONSTRAINT `diverrs_comments_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`),
  CONSTRAINT `diverrs_comments_ibfk_2` FOREIGN KEY (`idService`) REFERENCES `diverrs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diverrs_comments`
--

LOCK TABLES `diverrs_comments` WRITE;
/*!40000 ALTER TABLE `diverrs_comments` DISABLE KEYS */;
INSERT INTO `diverrs_comments` VALUES (1,'Recusandae hic non dolorem quidem alias commodi alias rerum quod.',10,1,'2022-06-06 10:54:40',NULL),(2,'Eum animi possimus perspiciatis tempora.',13,1,'2022-06-06 10:54:40',NULL),(3,'Praesentium nisi corporis aperiam.',12,1,'2022-06-06 10:54:40',NULL),(4,'Voluptatem harum est sit numquam.',3,1,'2022-06-06 10:54:40',NULL),(5,'Assumenda nostrum libero ut voluptas fuga quia.',1,1,'2022-06-06 10:54:40',NULL),(6,'Doloremque sunt adipisci qui dolore quam facilis sit laborum.',3,1,'2022-06-06 10:54:40',NULL),(7,'Distinctio minima quaerat quia dolorum delectus.',9,1,'2022-06-06 10:54:40',NULL),(8,'Eum voluptatem ullam voluptatem error quis excepturi dignissimos consectetur natus.',6,1,'2022-06-06 10:54:40',NULL),(9,'Ut in culpa et est officia sit enim ipsum.',10,1,'2022-06-06 10:54:40',NULL),(10,'Est ipsum quod nulla dignissimos.',11,1,'2022-06-06 10:54:40',NULL),(11,'Molestias et quaerat facere quas quibusdam omnis ipsam fuga.',11,1,'2022-06-06 10:54:40',NULL),(12,'Praesentium quos et.',9,1,'2022-06-06 10:54:40',NULL),(13,'Et deserunt cupiditate aut vero voluptatem harum ut commodi mollitia.',11,1,'2022-06-06 10:54:40',NULL),(14,'Consequuntur omnis fugiat debitis placeat est aliquid vel.',12,1,'2022-06-06 10:54:40',NULL),(15,'Unde qui saepe ut sed asperiores reprehenderit.',10,1,'2022-06-06 10:54:40',NULL),(16,'Quasi eligendi in quia et dolor ut.',9,2,'2022-06-06 10:54:40',NULL),(17,'Sit deserunt sed incidunt sit impedit voluptatem.',4,2,'2022-06-06 10:54:40',NULL),(18,'Quia dolorem doloribus autem deserunt aperiam omnis placeat commodi.',10,2,'2022-06-06 10:54:40',NULL),(19,'Eius suscipit porro quae ad.',6,2,'2022-06-06 10:54:40',NULL),(20,'Rem perferendis est aut velit ut magni.',5,2,'2022-06-06 10:54:40',NULL),(21,'Magnam nisi corporis maxime porro voluptates minus provident sit.',10,2,'2022-06-06 10:54:40',NULL),(22,'Beatae dolor et rerum beatae inventore saepe sequi.',8,2,'2022-06-06 10:54:40',NULL),(23,'Natus ipsum vel ut dolorem autem incidunt animi ab itaque.',3,2,'2022-06-06 10:54:40',NULL),(24,'Ipsam maiores unde.',8,2,'2022-06-06 10:54:40',NULL),(25,'Quis cumque pariatur et soluta.',4,2,'2022-06-06 10:54:40',NULL),(26,'Ut placeat neque quia numquam quod ad distinctio repellat exercitationem.',2,2,'2022-06-06 10:54:40',NULL),(27,'Reprehenderit esse veniam et.',8,2,'2022-06-06 10:54:40',NULL),(28,'Aut nihil aut quas dignissimos facere temporibus.',8,2,'2022-06-06 10:54:40',NULL),(29,'Animi dolores aut.',5,2,'2022-06-06 10:54:40',NULL),(30,'Sunt vero sit mollitia fuga velit vitae incidunt.',3,2,'2022-06-06 10:54:40',NULL),(31,'Ut eos eius et quasi quisquam nihil quos odio.',3,3,'2022-06-06 10:54:40',NULL),(32,'Dolores et aut a est.',13,3,'2022-06-06 10:54:40',NULL),(33,'Sed vel aspernatur deserunt ipsa nisi provident saepe.',1,3,'2022-06-06 10:54:40',NULL),(34,'Ipsa pariatur reiciendis voluptatem consectetur occaecati.',2,3,'2022-06-06 10:54:40',NULL),(35,'Possimus quam modi qui libero quis earum.',2,3,'2022-06-06 10:54:40',NULL),(36,'Minima a placeat sit.',1,3,'2022-06-06 10:54:40',NULL),(37,'Qui consequatur sed impedit dolores accusamus iste natus pariatur fuga.',6,3,'2022-06-06 10:54:40',NULL),(38,'Animi laudantium sed veritatis consequatur.',3,3,'2022-06-06 10:54:40',NULL),(39,'Delectus mollitia reprehenderit similique sunt consequuntur.',10,3,'2022-06-06 10:54:40',NULL),(40,'Ipsum mollitia voluptates dicta numquam itaque aut et tempora nesciunt.',8,3,'2022-06-06 10:54:40',NULL),(41,'Quas rerum placeat voluptas.',9,3,'2022-06-06 10:54:40',NULL),(42,'Dolor sunt at nisi.',11,3,'2022-06-06 10:54:40',NULL),(43,'Tempora beatae repellendus ipsam minus.',4,3,'2022-06-06 10:54:40',NULL),(44,'Dolores fugit maxime molestiae placeat.',11,3,'2022-06-06 10:54:40',NULL),(45,'Qui illum maxime ea.',10,3,'2022-06-06 10:54:40',NULL),(46,'Unde illo sunt molestiae est impedit aspernatur.',2,4,'2022-06-06 10:54:40',NULL),(47,'Voluptatem eum aut distinctio recusandae incidunt incidunt.',5,4,'2022-06-06 10:54:40',NULL),(48,'Sunt non alias molestiae fugiat omnis.',2,4,'2022-06-06 10:54:40',NULL),(49,'Ratione non eos non nisi nesciunt.',5,4,'2022-06-06 10:54:40',NULL),(50,'Excepturi ea officia.',13,4,'2022-06-06 10:54:40',NULL),(51,'Laborum similique atque sit odit dicta.',10,4,'2022-06-06 10:54:40',NULL),(52,'Pariatur pariatur dolorem laudantium fugiat.',2,4,'2022-06-06 10:54:40',NULL),(53,'Sed at laborum est.',5,4,'2022-06-06 10:54:40',NULL),(54,'Omnis natus ipsam.',5,4,'2022-06-06 10:54:40',NULL),(55,'Tenetur exercitationem nam quam similique voluptatem debitis reiciendis.',5,4,'2022-06-06 10:54:40',NULL),(56,'Aut magni soluta tenetur.',8,4,'2022-06-06 10:54:40',NULL),(57,'Quas quo vero.',4,4,'2022-06-06 10:54:40',NULL),(58,'Voluptatem consectetur et temporibus perspiciatis ut ut.',12,4,'2022-06-06 10:54:40',NULL),(59,'Iure placeat libero et molestias voluptate.',10,4,'2022-06-06 10:54:40',NULL),(60,'Et recusandae nobis odit vel autem est laudantium.',5,4,'2022-06-06 10:54:40',NULL),(61,'Reprehenderit rerum autem.',3,5,'2022-06-06 10:54:40',NULL),(62,'Vel et vitae porro necessitatibus est est quasi.',1,5,'2022-06-06 10:54:40',NULL),(63,'Rerum qui quo et.',13,5,'2022-06-06 10:54:40',NULL),(64,'Omnis aut similique cupiditate quibusdam corporis sit architecto ex.',9,5,'2022-06-06 10:54:40',NULL),(65,'Illo repellendus est in.',9,5,'2022-06-06 10:54:40',NULL),(66,'Quae eum quisquam dolorum quisquam voluptatibus recusandae magnam et.',7,5,'2022-06-06 10:54:40',NULL),(67,'Voluptatem asperiores non optio.',2,5,'2022-06-06 10:54:40',NULL),(68,'Quis odit officiis qui voluptas eveniet laboriosam unde a.',1,5,'2022-06-06 10:54:40',NULL),(69,'Repudiandae doloribus minus voluptate ducimus incidunt sed.',4,5,'2022-06-06 10:54:40',NULL),(70,'Et excepturi iusto repellendus ducimus.',10,5,'2022-06-06 10:54:40',NULL),(71,'Sequi et ut eligendi voluptas vero.',10,5,'2022-06-06 10:54:40',NULL),(72,'Est earum suscipit neque.',5,5,'2022-06-06 10:54:40',NULL),(73,'Ipsam itaque nisi.',11,5,'2022-06-06 10:54:40',NULL),(74,'Rerum ut quod.',9,5,'2022-06-06 10:54:40',NULL),(75,'Libero in earum reiciendis.',6,5,'2022-06-06 10:54:40',NULL);
/*!40000 ALTER TABLE `diverrs_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diverrs_solution`
--

DROP TABLE IF EXISTS `diverrs_solution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diverrs_solution` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idService` int NOT NULL,
  `idUser` int NOT NULL,
  `file` varchar(100) DEFAULT NULL,
  `startedAt` datetime NOT NULL,
  `finishedAt` datetime DEFAULT NULL,
  `markAsFinished` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idService` (`idService`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `diverrs_solution_ibfk_1` FOREIGN KEY (`idService`) REFERENCES `diverrs` (`id`),
  CONSTRAINT `diverrs_solution_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diverrs_solution`
--

LOCK TABLES `diverrs_solution` WRITE;
/*!40000 ALTER TABLE `diverrs_solution` DISABLE KEYS */;
INSERT INTO `diverrs_solution` VALUES (1,1,6,'58a6d531-a73a-48eb-af4a-b9df85c0ce04.txt','2022-06-06 10:54:40',NULL,_binary '\0'),(2,2,4,'c32788a1-e24b-4e5c-96ab-6c8bf7a1c5fa.pdf','2022-06-06 10:54:40',NULL,_binary '\0'),(3,3,6,'eabf0416-0c2c-4dda-85d1-31394773fbb0.txt','2022-06-06 10:54:40',NULL,_binary '\0'),(4,4,2,'6564cc54-18aa-4d7f-a71d-c9a66de8a773.txt','2022-06-06 10:54:40',NULL,_binary '\0'),(5,5,10,'1d0b019b-4cc9-4c08-b27b-3c59abce2cd6.docx','2022-06-06 10:54:40',NULL,_binary '\0');
/*!40000 ALTER TABLE `diverrs_solution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diverrs_status`
--

DROP TABLE IF EXISTS `diverrs_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diverrs_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diverrs_status`
--

LOCK TABLES `diverrs_status` WRITE;
/*!40000 ALTER TABLE `diverrs_status` DISABLE KEYS */;
INSERT INTO `diverrs_status` VALUES (1,'Unassigned'),(2,'Assigned'),(3,'Completed');
/*!40000 ALTER TABLE `diverrs_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` tinytext NOT NULL,
  `role` enum('normal','admin') NOT NULL DEFAULT 'normal',
  `name` tinytext NOT NULL,
  `bio` varchar(500) DEFAULT NULL,
  `avatar` tinytext,
  `createdAt` datetime NOT NULL,
  `modifiedAt` datetime DEFAULT NULL,
  `lastAuthUpdate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'luna@hackaboss.com','$2b$08$/cKZpqMHIEdPsJcHu0vaWuzZTevHyqJoFD44AR6v4gmv5qPuAJhoe','admin','Luna','Lorem fistrum','d1a298f8-3476-4731-815b-e4804c4ba3fb.jpg','2022-06-06 10:54:40','2022-06-06 10:54:40','2022-06-06 10:54:40'),(2,'manu@hackaboss.com','$2b$08$OrHOFs0WAiCtKWnzdkGwi.bELOabF11hKe6fVcPW1Nm.cX6njHqg6','admin','Manu','Lorem fistrum','eb9f3cfd-4ff6-4d3a-ada9-c9ac355c87fa.jpg','2022-06-06 10:54:40','2022-06-06 10:54:40','2022-06-06 10:54:40'),(3,'javi@hackaboss.com','$2b$08$RgHqmf9q/ARuunnUM85zuelVyzIayPvEZ2dE16G0b8E0JMNGK/V7m','admin','Javier','Lorem fistrum','2f879d8e-b7a5-4a52-b2fc-c58380ec29a9.jpg','2022-06-06 10:54:40','2022-06-06 10:54:40','2022-06-06 10:54:40'),(4,'AnaMara.Molina@yahoo.com','$2b$08$PfCEcPSDOupGQRkGhyCww.LtHw6MaLwSD8GdWZYUh5IL1xoHoESrG','normal','Salvador Gallegos PhD','Possimus deleniti neque molestiae fuga vitae cupiditate. Numquam maxime cupiditate aut. Accusamus dolores in impedit. Optio voluptas vel voluptates iste quam quo ab.','91c25147-f1e0-46a9-a234-e63c1a36ef72.jpg','2022-06-06 10:54:40','2022-06-06 10:54:40','2022-06-06 10:54:40'),(5,'Leticia_Irizarry@gmail.com','$2b$08$GSPhorh.Ng5S2b1gfAaUluIgGXFR5cR4RJk/3oHG3nvYfD4lHDzwu','normal','Salvador Santana','In modi qui aspernatur hic. Reiciendis nam quo est odio. Laborum harum et quas commodi perferendis. Voluptatem ducimus qui et natus omnis ducimus quisquam dolor. Ducimus id esse ut officia voluptatem. Officiis odio et fuga atque voluptas saepe fuga libero sit.','ace5efa7-0bd8-4b5c-921c-17242072e4da.jpg','2022-06-06 10:54:40','2022-06-06 10:54:40','2022-06-06 10:54:40'),(6,'Barbara1@yahoo.com','$2b$08$/RHGiA0TKEN.OGvXLqWtbOjcCcT9BWzMOlKGndXYc/18m9R9LaLxa','normal','Jordi Cepeda','Ipsum saepe necessitatibus quidem maxime a ut incidunt. Et facilis quia. Nisi sapiente et quaerat repellendus quis. Consequatur animi adipisci qui a occaecati. Ut dolorum consequatur. Nihil voluptatem dicta ut possimus corrupti.','f184f107-2459-4baa-9c24-16882b2de79c.jpg','2022-06-06 10:54:40','2022-06-06 10:54:40','2022-06-06 10:54:40'),(7,'Susana.Samaniego1@hotmail.com','$2b$08$e0zE7ixcvBDrwa73Zu063uKl4XXjkOVljnUlk4Dkj1XIcypOvg5Wu','normal','Ricardo Arevalo','Consequatur id minus error placeat quis facilis dolorem laboriosam consequatur. Animi et occaecati rerum nulla et similique. Accusantium assumenda ab. Nesciunt vitae quia et quae expedita nulla consequatur harum iusto. Optio et enim facilis voluptatibus.','6be399f3-e461-43f8-9435-d95439464b28.jpg','2022-06-06 10:54:40','2022-06-06 10:54:40','2022-06-06 10:54:40'),(8,'Armando_Loera@yahoo.com','$2b$08$22LFfTDmU.5dnlTNCvmiJuOnio6cipr/MUtTMdFAfw1zye9IqcV7W','normal','Lorena Vergara','Cupiditate et minus odio qui rerum ea. Dolore a nam fugit eum ea amet et. Delectus eos quia aut recusandae fuga eligendi. Maxime molestiae enim dolor vel unde hic et eum commodi. Necessitatibus et rerum et officia velit quia et.','3bb32f42-da8a-43e8-a9c6-3648186148a8.jpg','2022-06-06 10:54:40','2022-06-06 10:54:40','2022-06-06 10:54:40'),(9,'Isabel.Curiel86@hotmail.com','$2b$08$tbAAAf.BEYSfxAKgO8LgWe2ivDFvPGrS4NgdANXIt0jLZytQOxk8.','normal','Anni Alarcón','Expedita esse ex cumque aperiam. Consequatur est libero. Earum tenetur consequuntur impedit consequatur dolorum cupiditate similique cum.','9d5b4a02-efbf-49e8-aae1-ba596fbb3261.jpg','2022-06-06 10:54:40','2022-06-06 10:54:40','2022-06-06 10:54:40'),(10,'Isabela.deJess18@hotmail.com','$2b$08$p01a8uk7BkHQD61CtHBMFe/Aaa9Ld1tLtCqr7NDte/zCAskjHbLYO','normal','Maica Galindo','Eos maiores et omnis. Asperiores quasi a vero culpa labore autem quibusdam sunt. Incidunt sed veritatis dolorem. Sit id eveniet dolore.','42ebd660-9de7-4668-b8a3-82e539f7b419.jpg','2022-06-06 10:54:40','2022-06-06 10:54:40','2022-06-06 10:54:40'),(11,'Elvira.Razo@hotmail.com','$2b$08$nz6uf.NT6bOdMxrFlfngrOcjG28fA15DXgbvCW.DJzNEQhK6Kf996','normal','Carles Jiménez','Magni omnis minus modi qui eligendi sunt et. Distinctio qui ut eligendi. Dolorem porro inventore quia.','083120c5-5665-4897-924e-66cd6af5617d.jpg','2022-06-06 10:54:40','2022-06-06 10:54:40','2022-06-06 10:54:40'),(12,'Mario5@yahoo.com','$2b$08$kOLq94AysMx4piaVjX5E7eKmmE4AgDoghVN2p8Km5mBs5bCv.BSqO','normal','Marta Granados IV','Libero quis alias. Nulla incidunt odit omnis iusto ut aliquam. Et modi ea autem neque et voluptatum et facere.','6a0d54a2-edbd-4f5f-91e3-6a35365aac2e.jpg','2022-06-06 10:54:40','2022-06-06 10:54:40','2022-06-06 10:54:40'),(13,'Benjamn_Ybarra43@yahoo.com','$2b$08$IKKnwtqD7c4z49dkdQMuo.N0oqjsDX411rhWri5Jf6q1jO6QrJpum','normal','Pedro Holguín','Molestiae veritatis ratione nulla eos. Esse accusantium inventore sint commodi distinctio provident. Quasi laborum voluptas hic iusto harum modi minima non. Quo et consectetur cum repellat nihil facilis. Suscipit vel nostrum temporibus quod eum numquam harum necessitatibus.','d8c80f23-d67d-485b-9fb6-eaafa7b06796.jpg','2022-06-06 10:54:40','2022-06-06 10:54:40','2022-06-06 10:54:40');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-06 12:55:50
