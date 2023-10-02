CREATE TABLE `memes` (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);