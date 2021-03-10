CREATE DATABASE IF NOT EXISTS `HyperTube`;
USE `HyperTube`;
CREATE TABLE IF NOT EXISTS `Users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
	`userID` VARCHAR(40),
    `userFrom` VARCHAR(6),
    `userName` VARCHAR(40),
    `email` VARCHAR(100),
    `firstName` VARCHAR(25),
    `lastName` VARCHAR(25),
    `password` VARCHAR(60),
	`image` VARCHAR(255),
    `jwt` VARCHAR(255),
	`token` VARCHAR(172),
    `isActive` INT DEFAULT 0
);
CREATE TABLE IF NOT EXISTS `Comments` (
    `commentID` INT AUTO_INCREMENT PRIMARY KEY,
    `userID` VARCHAR(40) NOT NULL,
    `imdbID` VARCHAR(10) NOT NULL,
    `commentContent` VARCHAR(100) NOT NULL,
	`date` DATETIME DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS `Favorites` (
    `favoriteID` INT AUTO_INCREMENT PRIMARY KEY,
    `userID` VARCHAR(40) NOT NULL,
    `imdbID` VARCHAR(10) NOT NULL,
    `movieTitle` VARCHAR(100) NOT NULL,
    `movieRating` DECIMAL (10,2) NOT NULL,
    `movieImage` VARCHAR(100) NOT NULL,
    `movieDescription` VARCHAR(1024) NOT NULL,
    `movieLanguage` VARCHAR(10) NOT NULL,
    `movieRelease` VARCHAR(4) NOT NULL,
    `movieTime` INT NOT NULL,
    `movieGenre` VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS `Viewed` (
    `viewedID` INT AUTO_INCREMENT PRIMARY KEY,
    `userID` VARCHAR(40) NOT NULL,
    `imdbID` VARCHAR(10) NOT NULL,
    `movieTitle` VARCHAR(100) NOT NULL,
    `movieRating` DECIMAL (10,2) NOT NULL,
    `movieImage` VARCHAR(100) NOT NULL,
    `movieDescription` VARCHAR(1024) NOT NULL,
    `movieLanguage` VARCHAR(10) NOT NULL,
    `movieRelease` VARCHAR(4) NOT NULL,
    `movieTime` INT NOT NULL,
    `movieGenre` VARCHAR(255) NOT NULL,
	`date` DATETIME DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS `Movies` (
    `movieID` INT AUTO_INCREMENT PRIMARY KEY,
    `imdbID` VARCHAR(10) NOT NULL,
    `torrentHash` VARCHAR(100) NOT NULL,
    `path` VARCHAR(255),
    `isDownloaded` INT DEFAULT 0
);