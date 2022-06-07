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

DROP SCHEMA IF EXISTS diverr;
CREATE DATABASE diverr;
USE diverr;
--
-- Table structure for table `diverrs`
--

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
INSERT INTO `diverrs` VALUES (1,13,'doloribus','Ipsum nihil ex ut quia quae a et iste nulla.','96263f93-7c8f-47ff-bd44-22252b5cece3.txt','fc51216e-3638-4800-9c9f-021f45e8d989.jpg',871,2,1,'2022-06-07 09:15:41',NULL),(2,4,'inventore','Sed quidem hic fugit earum.','a29d9205-cdb8-4b76-9dfe-687c179fb2a1.txt','467b2ba1-dd59-4225-94ed-72e9af4b2caa.jpg',848,2,2,'2022-06-07 09:15:41',NULL),(3,10,'reiciendis','Magnam maiores quidem harum voluptatem itaque hic itaque.','2438864b-db6f-4f85-9049-466d6842ed7a.txt','85e6be8e-fd46-4b09-b327-aceeb33621c2.jpg',231,2,6,'2022-06-07 09:15:41',NULL),(4,8,'id','Dolorum et rerum minus eos tempora excepturi deserunt cum.','99be9864-ca02-4682-b151-9a47100b92e7.pdf','c596fd2f-19fa-48fd-8778-48c46a68aa6e.jpg',822,2,5,'2022-06-07 09:15:41',NULL),(5,12,'at','Sapiente quia magni aperiam.','03b7e1da-15ac-4abb-bdc2-fe27b32f489a.txt','49a3c039-743f-46a9-8ec3-dcdc9153d683.jpg',972,2,1,'2022-06-07 09:15:41',NULL);
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
  `idDiverr` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `modifiedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idDiverr` (`idDiverr`),
  CONSTRAINT `diverrs_comments_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`),
  CONSTRAINT `diverrs_comments_ibfk_2` FOREIGN KEY (`idDiverr`) REFERENCES `diverrs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diverrs_comments`
--

LOCK TABLES `diverrs_comments` WRITE;
/*!40000 ALTER TABLE `diverrs_comments` DISABLE KEYS */;
INSERT INTO `diverrs_comments` VALUES (1,'Vero id omnis quasi quas aut voluptas.',2,1,'2022-06-07 09:15:41',NULL),(2,'Quia aut rerum quis nostrum dolor a.',5,1,'2022-06-07 09:15:41',NULL),(3,'In quo debitis.',1,1,'2022-06-07 09:15:41',NULL),(4,'Reiciendis provident id voluptatem officia consectetur voluptate ea voluptate.',8,1,'2022-06-07 09:15:41',NULL),(5,'Illum voluptates praesentium qui et eius exercitationem nemo neque aliquid.',1,1,'2022-06-07 09:15:41',NULL),(6,'Expedita nihil cum et adipisci pariatur.',11,1,'2022-06-07 09:15:41',NULL),(7,'Ea illum similique iusto aut totam et.',6,1,'2022-06-07 09:15:41',NULL),(8,'Ab sint sint ullam blanditiis hic.',10,1,'2022-06-07 09:15:41',NULL),(9,'Eum dolor et officia et occaecati.',5,1,'2022-06-07 09:15:41',NULL),(10,'Iusto dolorum non beatae reiciendis incidunt.',11,1,'2022-06-07 09:15:41',NULL),(11,'Molestias nam rerum cum cum aut.',2,1,'2022-06-07 09:15:41',NULL),(12,'Aliquam et aut molestiae.',3,1,'2022-06-07 09:15:41',NULL),(13,'Nam vel vitae.',1,1,'2022-06-07 09:15:41',NULL),(14,'Odio ut est at quia minima non iusto et.',5,1,'2022-06-07 09:15:41',NULL),(15,'Nisi rerum at ab officia qui aut quo non consequatur.',13,1,'2022-06-07 09:15:41',NULL),(16,'Accusamus quia nemo et asperiores enim rerum.',3,2,'2022-06-07 09:15:41',NULL),(17,'Nobis totam consequuntur est perspiciatis eum quos et.',7,2,'2022-06-07 09:15:41',NULL),(18,'Possimus optio qui quia rerum eos perferendis quo accusantium.',8,2,'2022-06-07 09:15:41',NULL),(19,'Sequi provident omnis reiciendis commodi.',10,2,'2022-06-07 09:15:41',NULL),(20,'Amet fugiat iste repellat est recusandae eos voluptate.',3,2,'2022-06-07 09:15:41',NULL),(21,'Totam dignissimos tempora minus ipsam rerum illo.',1,2,'2022-06-07 09:15:41',NULL),(22,'Illo facilis consequatur ipsum dolorem incidunt.',2,2,'2022-06-07 09:15:41',NULL),(23,'Neque cumque sed.',8,2,'2022-06-07 09:15:41',NULL),(24,'Nam sequi accusantium praesentium perferendis expedita adipisci dolorum.',8,2,'2022-06-07 09:15:41',NULL),(25,'Voluptatibus voluptas iure iusto alias.',3,2,'2022-06-07 09:15:41',NULL),(26,'Magnam consequatur harum voluptatem accusamus voluptas.',6,2,'2022-06-07 09:15:41',NULL),(27,'Minus doloribus vero sed repudiandae ut.',3,2,'2022-06-07 09:15:41',NULL),(28,'Cumque ullam nostrum sed.',10,2,'2022-06-07 09:15:41',NULL),(29,'Consequatur quasi sint id ipsam placeat nobis.',5,2,'2022-06-07 09:15:41',NULL),(30,'Aliquam et consectetur adipisci pariatur quo accusantium dolorum omnis quidem.',7,2,'2022-06-07 09:15:41',NULL),(31,'Veniam impedit quas.',7,3,'2022-06-07 09:15:41',NULL),(32,'Consequatur nostrum saepe nemo numquam nihil est odio.',3,3,'2022-06-07 09:15:41',NULL),(33,'Et ratione velit molestiae quis aut voluptatum veniam.',5,3,'2022-06-07 09:15:41',NULL),(34,'Nihil qui aut et dolores fugit voluptas est.',9,3,'2022-06-07 09:15:41',NULL),(35,'Atque quibusdam eos exercitationem corrupti repellat repudiandae nihil.',10,3,'2022-06-07 09:15:41',NULL),(36,'Reiciendis dignissimos nihil.',7,3,'2022-06-07 09:15:41',NULL),(37,'Ipsum sed occaecati possimus a sed praesentium.',5,3,'2022-06-07 09:15:41',NULL),(38,'Illum repudiandae magni facilis.',13,3,'2022-06-07 09:15:41',NULL),(39,'Atque ea voluptas velit libero velit aspernatur corporis saepe expedita.',6,3,'2022-06-07 09:15:41',NULL),(40,'Mollitia nobis saepe rem doloribus asperiores veniam modi.',13,3,'2022-06-07 09:15:41',NULL),(41,'Illo nihil ut voluptatem sit non totam reiciendis voluptas.',11,3,'2022-06-07 09:15:41',NULL),(42,'Tempora molestiae veritatis enim nisi vel possimus voluptatem.',6,3,'2022-06-07 09:15:41',NULL),(43,'Nisi dicta dolorem.',13,3,'2022-06-07 09:15:41',NULL),(44,'Et alias non et labore voluptas sed ea laborum.',7,3,'2022-06-07 09:15:41',NULL),(45,'Provident officia nesciunt commodi quis nobis tempora qui recusandae impedit.',12,3,'2022-06-07 09:15:41',NULL),(46,'Nisi debitis alias quia ea qui deleniti.',10,4,'2022-06-07 09:15:41',NULL),(47,'Velit quisquam rerum.',9,4,'2022-06-07 09:15:41',NULL),(48,'Dolorem ullam aut voluptas.',7,4,'2022-06-07 09:15:41',NULL),(49,'Vero et quisquam aliquam ducimus sapiente rerum et sed.',7,4,'2022-06-07 09:15:41',NULL),(50,'Voluptatem nisi dicta quaerat voluptates consequatur soluta.',13,4,'2022-06-07 09:15:41',NULL),(51,'Repellat dicta odio mollitia et ab vel excepturi.',12,4,'2022-06-07 09:15:41',NULL),(52,'Placeat ut aut eaque.',1,4,'2022-06-07 09:15:41',NULL),(53,'Dolores id suscipit.',8,4,'2022-06-07 09:15:41',NULL),(54,'Facilis ut atque non repellendus dolorum aspernatur officia sit quis.',10,4,'2022-06-07 09:15:41',NULL),(55,'Iusto facere praesentium quia cupiditate architecto expedita.',12,4,'2022-06-07 09:15:41',NULL),(56,'Laboriosam sapiente ea necessitatibus amet iure ex et sunt quo.',5,4,'2022-06-07 09:15:41',NULL),(57,'Vero ipsam porro.',4,4,'2022-06-07 09:15:41',NULL),(58,'Neque molestias et architecto earum.',10,4,'2022-06-07 09:15:41',NULL),(59,'Eum esse est in magnam repudiandae expedita optio enim saepe.',8,4,'2022-06-07 09:15:41',NULL),(60,'Sint aut est fuga dolorem quos est sit.',1,4,'2022-06-07 09:15:41',NULL),(61,'Quia voluptatem laboriosam expedita id.',2,5,'2022-06-07 09:15:41',NULL),(62,'Consectetur voluptas aut necessitatibus quas sit harum dicta.',2,5,'2022-06-07 09:15:41',NULL),(63,'Ratione repudiandae repudiandae hic velit tempora at sapiente animi quia.',8,5,'2022-06-07 09:15:41',NULL),(64,'Quis pariatur ipsam placeat quasi.',12,5,'2022-06-07 09:15:41',NULL),(65,'Nesciunt in et facere ipsa optio esse ut quia.',4,5,'2022-06-07 09:15:41',NULL),(66,'Cumque quidem pariatur necessitatibus unde.',13,5,'2022-06-07 09:15:41',NULL),(67,'Repellendus eos unde.',2,5,'2022-06-07 09:15:41',NULL),(68,'Sint aut est accusamus rerum dicta nulla ea alias minus.',11,5,'2022-06-07 09:15:41',NULL),(69,'Fugiat repellendus pariatur officiis.',11,5,'2022-06-07 09:15:41',NULL),(70,'Cum veniam suscipit harum id velit facilis.',11,5,'2022-06-07 09:15:41',NULL),(71,'Sit est doloremque id repellendus architecto recusandae.',7,5,'2022-06-07 09:15:41',NULL),(72,'Fugiat ut magnam placeat et veniam nisi blanditiis.',1,5,'2022-06-07 09:15:41',NULL),(73,'Dolore sunt harum aut ut.',7,5,'2022-06-07 09:15:41',NULL),(74,'Corporis et sed soluta deleniti.',6,5,'2022-06-07 09:15:41',NULL),(75,'Esse qui quia nisi officia explicabo dolorem.',5,5,'2022-06-07 09:15:41',NULL);
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
  `idDiverr` int NOT NULL,
  `idUser` int NOT NULL,
  `file` varchar(100) DEFAULT NULL,
  `startedAt` datetime NOT NULL,
  `finishedAt` datetime DEFAULT NULL,
  `markAsFinished` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idDiverr` (`idDiverr`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `diverrs_solution_ibfk_1` FOREIGN KEY (`idDiverr`) REFERENCES `diverrs` (`id`),
  CONSTRAINT `diverrs_solution_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diverrs_solution`
--

LOCK TABLES `diverrs_solution` WRITE;
/*!40000 ALTER TABLE `diverrs_solution` DISABLE KEYS */;
INSERT INTO `diverrs_solution` VALUES (1,1,5,'27e14393-6e7f-4643-a805-072b1cc0982b.txt','2022-06-07 09:15:41',NULL,0),(2,2,8,'2e0373b3-4378-4ee6-ac19-c3f749030668.txt','2022-06-07 09:15:41',NULL,0),(3,3,7,'35a7027f-94df-41a1-af61-4cb5cb94f1f5.txt','2022-06-07 09:15:41',NULL,0),(4,4,10,'e7c5c0e1-afa0-439b-b4ba-3168144c8216.txt','2022-06-07 09:15:41',NULL,0),(5,5,7,'90991926-d755-4812-97df-e1b7a963984b.docx','2022-06-07 09:15:41',NULL,0);
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
INSERT INTO `users` VALUES (1,'luna@hackaboss.com','$2b$08$25Z3WaFoDD5aPenSPf.jKu/xWIwgvxZTdNZ5Iw34fWABh/3LUqXsS','admin','Luna','Lorem fistrum','734e2f81-337b-4ffb-b9f9-a4d14b009474.jpg','2022-06-07 09:15:40','2022-06-07 09:15:40','2022-06-07 09:15:40'),(2,'manu@hackaboss.com','$2b$08$METVQQmzIRajY9sF97DcJeGYQpeGCbjjbkkR/fEOn9amyzeKptBY6','admin','Manu','Lorem fistrum','47f7aa72-13f4-4c66-8267-7dfb9900a1aa.jpg','2022-06-07 09:15:40','2022-06-07 09:15:40','2022-06-07 09:15:40'),(3,'javi@hackaboss.com','$2b$08$ahoYIS8LKOwGk8cOTP9.weWCGk7Xk/vgbgnBt/kfJVqvxdyQaOaZy','admin','Javier','Lorem fistrum','ab2728c5-91c2-4c1f-a191-202cf3c96727.jpg','2022-06-07 09:15:40','2022-06-07 09:15:40','2022-06-07 09:15:40'),(4,'Ariadna17@hotmail.com','$2b$08$SzBH0N/0BGXAd3MqyS.6b.X9I6KuQQUnjXWft3JTtkWHNJur/JE9i','normal','Daniel Muro','Quia omnis modi ea dolores similique nemo commodi et error. Voluptas et maxime sed suscipit vitae assumenda. Et voluptatem vel molestiae adipisci architecto quod. Laboriosam provident molestiae neque. Ab molestiae sequi libero at corrupti quia voluptatem.','5970ac5e-6f0d-473f-897b-6a482f5b12ba.jpg','2022-06-07 09:15:40','2022-06-07 09:15:40','2022-06-07 09:15:40'),(5,'Francisca.lvarez@gmail.com','$2b$08$VwOpa6vAYuNdWJr0asR7nOzu09jYky71MwyK497gMlHnh6x2bxQsy','normal','Laura Maya','Quaerat molestias non reprehenderit nesciunt doloribus ea. Dolorem temporibus expedita id quia facere dolores dolorum itaque quam. Nostrum animi rerum omnis sunt et deserunt explicabo.','b5055ba1-e749-4489-905e-3b690467eaba.jpg','2022-06-07 09:15:40','2022-06-07 09:15:40','2022-06-07 09:15:40'),(6,'MaraCristina57@hotmail.com','$2b$08$JcL.p3NXsEiA8Zv5KLiaye/uCLaJBdQLLo8CGwVRigQ94JeY0wLgu','normal','Ana Delatorre','Veniam perspiciatis ea soluta vitae velit tenetur repellendus ducimus ratione. Debitis non pariatur totam in neque vel. Ullam consequatur accusamus ut necessitatibus impedit dolor numquam debitis alias. Est sint deserunt totam.','0ab50920-65bf-4da8-be40-d6573efc6cbd.jpg','2022-06-07 09:15:40','2022-06-07 09:15:40','2022-06-07 09:15:40'),(7,'Concepcin28@yahoo.com','$2b$08$/xvJ.QBqLqo7oOMTxUpZfu2DPh4jmpWlyAri79161CgGJcH.bHmj6','normal','Sra. Iván Aranda','Earum animi sequi qui maiores ab est excepturi facere molestias. Delectus aperiam veniam recusandae ut aut aut aspernatur. Fuga assumenda eos et et quis eos veritatis aut fugit. Sit quaerat fuga numquam tempore magni.','40b1ae45-84b8-4acf-bf34-c3a93645fd9e.jpg','2022-06-07 09:15:40','2022-06-07 09:15:40','2022-06-07 09:15:40'),(8,'Patricio.Varela82@hotmail.com','$2b$08$GvGDJ3UuVKlmKCPBoNU.eO5m66tlFND2LKZhP0Zhnb8fUFubOR7lq','normal','Sr. Ricardo Regalado','Dolorem et dolor placeat. Qui officiis perspiciatis sit at harum repudiandae qui. Aut quasi et rerum eaque voluptatem autem maiores. Illo nesciunt maiores esse quibusdam omnis ut. Odio rerum quis similique rem tenetur dolor omnis expedita. Consequatur minus et adipisci quaerat aut tempore minus.','faf2dd4d-17b4-47fb-82b0-da9cf9d56d70.jpg','2022-06-07 09:15:40','2022-06-07 09:15:40','2022-06-07 09:15:40'),(9,'Lucas_Betancourt12@gmail.com','$2b$08$edbVvgmG85Qz./SPKFmOluI35sW/qtZNAMXgxj8sgQyBmv/TuRDo.','normal','Anni Valles','Maxime itaque rerum aut. Rerum officiis ut dolor enim ad magnam. Ipsum enim cumque blanditiis ad quia. Voluptatem vel rerum est illum sit cumque molestiae. Molestiae voluptate quia.','0bd8d055-7303-406b-a1f6-1993a3d1837a.jpg','2022-06-07 09:15:40','2022-06-07 09:15:40','2022-06-07 09:15:40'),(10,'Guillermo_Jaimes75@yahoo.com','$2b$08$rO5Dezte3/WHUCmwgRWwa.yx14Ap0HUzWshHCh0pE7LIew667.mdm','normal','Carles Amaya','Consequuntur iusto et incidunt omnis atque ex laudantium quas. Consequuntur veritatis praesentium voluptas quidem veritatis. Voluptates tempora quaerat deserunt nam. Beatae saepe quis sint et deserunt aut eos. Veniam odit consequatur rerum excepturi animi rerum. Est ad perspiciatis quaerat expedita veniam sequi iste.','27e9058c-dce4-4248-9363-37908523d4ad.jpg','2022-06-07 09:15:40','2022-06-07 09:15:40','2022-06-07 09:15:40'),(11,'Rosalia_Huerta57@yahoo.com','$2b$08$F2SI6UgQiO5HbTS/7wK/5.CPHqgFMqlUMhUa6ilD3.XQoIjhp5HdO','normal','Andrea Viera','Tempora a est earum doloribus repellat unde id at. Perspiciatis eos quos ratione dignissimos. Non qui iure eum rem.','ccce0549-0a96-45fe-bdd2-ed7c608923dc.jpg','2022-06-07 09:15:40','2022-06-07 09:15:40','2022-06-07 09:15:40'),(12,'Marisol.Enrquez@gmail.com','$2b$08$gd3NJzUlTi45exeDkQ.yOeTX5RQ6idihJ605La/EwiOakeWby31Gq','normal','Daniel Soto','Laboriosam asperiores quod eos mollitia voluptatem amet quasi. Soluta explicabo exercitationem quia dolorem. Ea eum labore officiis rerum quaerat id. Quae eveniet commodi eos quidem quas cum.','55de3fac-49a8-4f0b-bccf-8d9a74382bc2.jpg','2022-06-07 09:15:41','2022-06-07 09:15:41','2022-06-07 09:15:41'),(13,'Manuel_Espinosa@hotmail.com','$2b$08$9pUvS8jnFdGLe5MOP3AhCuZ9dImG.YrU1gFiYMu9j5jggeHpq3afe','normal','Miguel Morales','Sed molestiae quaerat tempore a sunt corporis. Fuga similique culpa. Culpa optio cupiditate nam. Temporibus explicabo eius. Maiores repudiandae reprehenderit autem amet itaque quis non.','fd823a16-e5a9-40f9-a773-374bfd20bf45.jpg','2022-06-07 09:15:41','2022-06-07 09:15:41','2022-06-07 09:15:41');
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

-- Dump completed on 2022-06-07 11:16:12
