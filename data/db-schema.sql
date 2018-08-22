/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table credentials
# ------------------------------------------------------------

DROP TABLE IF EXISTS `credentials`;

CREATE TABLE `credentials` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c68a6c53e95a7dc357f4ebce8f0` (`user_id`),
  CONSTRAINT `FK_c68a6c53e95a7dc357f4ebce8f0` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `credentials` WRITE;
/*!40000 ALTER TABLE `credentials` DISABLE KEYS */;

INSERT INTO `credentials` (`id`, `created_at`, `updated_at`, `deleted_at`, `username`, `password`, `user_id`)
VALUES
	(1,'2018-08-21 00:00:00','2018-08-21 00:00:00',NULL,'pablo','$2b$05$nC49BxJQmCe0nCtfjtlYEu8VZaibmB.uJJGgEzMNak/KsIXUcDCyW',1);

/*!40000 ALTER TABLE `credentials` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table providers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `providers`;

CREATE TABLE `providers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `drg_definition` varchar(255) DEFAULT NULL,
  `provider_name` varchar(255) DEFAULT NULL,
  `provider_street_address` varchar(255) DEFAULT NULL,
  `provider_city` varchar(255) DEFAULT NULL,
  `provider_state` char(2) DEFAULT NULL,
  `provider_zip_code` varchar(6) DEFAULT NULL,
  `hospital_referral_region_description` varchar(255) DEFAULT NULL,
  `total_discharges` int(10) unsigned DEFAULT NULL,
  `average_cost_charges` int(10) unsigned DEFAULT NULL,
  `average_total_payments` int(10) unsigned DEFAULT NULL,
  `average_medicare_payments` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;

INSERT INTO `providers` (`id`, `created_at`, `updated_at`, `deleted_at`, `drg_definition`, `provider_name`, `provider_street_address`, `provider_city`, `provider_state`, `provider_zip_code`, `hospital_referral_region_description`, `total_discharges`, `average_cost_charges`, `average_total_payments`, `average_medicare_payments`)
VALUES
	(1,'2018-08-21 00:00:00','2018-08-21 00:00:00',NULL,'default drg','default name','default address','default city','CA','94105','default description',100,200,300,400);

/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `first_name` varchar(60) DEFAULT NULL,
  `last_name` varchar(90) DEFAULT NULL,
  `email` varchar(90) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `created_at`, `updated_at`, `deleted_at`, `first_name`, `last_name`, `email`)
VALUES
	(1,'2018-08-21 00:00:00','2018-08-21 00:00:00',NULL,'Pablo','Picasso','email@email.com');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
