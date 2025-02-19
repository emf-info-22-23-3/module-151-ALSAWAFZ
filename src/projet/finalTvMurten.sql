-- MySQL Script generated by MySQL Workbench
-- Tue Feb 18 09:06:31 2025
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema DB_finalTVMurten
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema DB_finalTVMurten
-- ------------------------j-----------------------------
CREATE SCHEMA IF NOT EXISTS `DB_finalTVMurten` DEFAULT CHARACTER SET utf8 ;
USE `DB_finalTVMurten` ;

-- -----------------------------------------------------
-- Table `DB_finalTVMurten`.`t_Team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_finalTVMurten`.`t_Team` (
  `PK_Teams` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`PK_Teams`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_finalTVMurten`.`t_Place`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_finalTVMurten`.`t_Place` (
  `PK_Place` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) NOT NULL,
  `PLZ` INT(4) NOT NULL,
  PRIMARY KEY (`PK_Place`),
  UNIQUE INDEX `PLZ_UNIQUE` (`PLZ` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_finalTVMurten`.`t_Login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_finalTVMurten`.`t_Login` (
  `PK_Login` INT NOT NULL AUTO_INCREMENT,
  `Uesrname` VARCHAR(20) NOT NULL,
  `Password` VARCHAR(100) NOT NULL,
  `Role` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`PK_Login`),
  UNIQUE INDEX `Uesrname_UNIQUE` (`Uesrname` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_finalTVMurten`.`t_Player`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_finalTVMurten`.`t_Player` (
  `PK_Player` INT NOT NULL AUTO_INCREMENT,
  `SpielerNr` VARCHAR(5) NOT NULL,
  `Name` VARCHAR(25) NOT NULL,
  `FamilyName` VARCHAR(25) NOT NULL,
  `Adresse` VARCHAR(45) NOT NULL,
  `FK_Place` INT NOT NULL,
  `Natel` VARCHAR(15) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Geburstag` DATE NOT NULL,
  `LIZENZ` VARCHAR(10) NOT NULL,
  `Schreiber` TINYINT NOT NULL,
  `Schiri` TINYINT NOT NULL,
  `JS` TINYINT NOT NULL,
  `FK_Login` INT NOT NULL,
  `SpielerKarte` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`PK_Player`),
  UNIQUE INDEX `Natel_UNIQUE` (`Natel` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  INDEX `fk_place_idx` (`FK_Place` ASC) VISIBLE,
  INDEX `fk_login_idx` (`FK_Login` ASC) VISIBLE,
  CONSTRAINT `fk_place`
    FOREIGN KEY (`FK_Place`)
    REFERENCES `DB_finalTVMurten`.`t_Place` (`PK_Place`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_login`
    FOREIGN KEY (`FK_Login`)
    REFERENCES `DB_finalTVMurten`.`t_Login` (`PK_Login`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_finalTVMurten`.`t_Match`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_finalTVMurten`.`t_Match` (
  `PK_Match` INT NOT NULL AUTO_INCREMENT,
  `Spiel` INT(10) NOT NULL,
  `Wochentag` VARCHAR(10) NOT NULL,
  `Datum` DATE NOT NULL,
  `MatchZeit` VARCHAR(10) NOT NULL,
  `FK_Team_Enemy` INT NOT NULL,
  `Halle` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`PK_Match`),
  INDEX `fk_team_enemy_idx` (`FK_Team_Enemy` ASC) VISIBLE,
  CONSTRAINT `fk_team_enemy`
    FOREIGN KEY (`FK_Team_Enemy`)
    REFERENCES `DB_finalTVMurten`.`t_Team` (`PK_Teams`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_finalTVMurten`.`t_Angriff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_finalTVMurten`.`t_Angriff` (
  `PK_Angriff` INT NOT NULL AUTO_INCREMENT,
  `FK_Match_Angriff` INT NOT NULL,
  `FK_Player_Angriff` INT NOT NULL,
  `BälleErhalten` INT(255) NULL,
  `Punkte` INT(255) NULL,
  `Druckvoll` INT(255) NULL,
  `Zu easy` INT(255) NULL,
  `Fehler` INT(255) NULL,
  `Block Punkt` INT(255) NULL,
  `Block` INT(255) NULL,
  `Ass` INT(255) NULL,
  PRIMARY KEY (`PK_Angriff`),
  INDEX `fk_match_idx` (`FK_Match_Angriff` ASC) VISIBLE,
  INDEX `fk_player_idx` (`FK_Player_Angriff` ASC) VISIBLE,
  CONSTRAINT `fk_match_Angriff`
    FOREIGN KEY (`FK_Match_Angriff`)
    REFERENCES `DB_finalTVMurten`.`t_Match` (`PK_Match`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_player_Angriff`
    FOREIGN KEY (`FK_Player_Angriff`)
    REFERENCES `DB_finalTVMurten`.`t_Player` (`PK_Player`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_finalTVMurten`.`t_Rece`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_finalTVMurten`.`t_Rece` (
  `PK_Rece` INT NOT NULL AUTO_INCREMENT,
  `FK_Player_Rece` INT NOT NULL,
  `FK_Match_Rece` INT NOT NULL,
  `Perfekt` INT(255) NULL,
  `Super(Zone)` INT(255) NULL,
  `Neutral` INT(255) NULL,
  `Schlecht` INT(255) NULL,
  `DirektFehler` INT(255) NULL,
  `FalscheEntscheidung` INT(255) NULL,
  PRIMARY KEY (`PK_Rece`),
  INDEX `fk_player_idx` (`FK_Player_Rece` ASC) VISIBLE,
  INDEX `fk_match_idx` (`FK_Match_Rece` ASC) VISIBLE,
  CONSTRAINT `fk_player_Rece`
    FOREIGN KEY (`FK_Player_Rece`)
    REFERENCES `DB_finalTVMurten`.`t_Player` (`PK_Player`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_match_Rece`
    FOREIGN KEY (`FK_Match_Rece`)
    REFERENCES `DB_finalTVMurten`.`t_Match` (`PK_Match`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
