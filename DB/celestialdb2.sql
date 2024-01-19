-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema maindb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema celestialdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `celestialdb` ;

-- -----------------------------------------------------
-- Schema celestialdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `celestialdb` DEFAULT CHARACTER SET utf8 ;
USE `celestialdb` ;

-- -----------------------------------------------------
-- Table `constellation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `constellation` ;

CREATE TABLE IF NOT EXISTS `constellation` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `about` TEXT NULL DEFAULT NULL,
  `image_url` VARCHAR(2000) NULL DEFAULT NULL,
  `enabled` TINYINT(4) NOT NULL,
  `create_date` DATETIME NULL DEFAULT NULL,
  `last_update` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `star_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `star_type` ;

CREATE TABLE IF NOT EXISTS `star_type` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `about` TEXT NULL DEFAULT NULL,
  `image_url` VARCHAR(2000) NULL DEFAULT NULL,
  `main_sequence` TINYINT(4) NULL DEFAULT NULL,
  `enabled` TINYINT(4) NOT NULL,
  `create_date` DATETIME NULL DEFAULT NULL,
  `last_update` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `star`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `star` ;

CREATE TABLE IF NOT EXISTS `star` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `about` TEXT NULL DEFAULT NULL,
  `image_url` VARCHAR(2000) NULL DEFAULT NULL,
  `enabled` TINYINT(4) NOT NULL,
  `right_ascension` VARCHAR(20) NULL DEFAULT NULL,
  `declination` VARCHAR(20) NULL DEFAULT NULL,
  `constellation_id` INT(11) NULL DEFAULT NULL,
  `star_type_id` INT(11) NULL DEFAULT NULL,
  `age_billion_years` VARCHAR(6) NULL DEFAULT NULL,
  `lifetime_billion_years` VARCHAR(6) NULL DEFAULT NULL,
  `create_date` DATETIME NOT NULL,
  `last_update` DATETIME NOT NULL,
  `solar_masses` INT(11) NULL DEFAULT NULL,
  `luminosity` INT(11) NULL DEFAULT NULL,
  `radius` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_star_constellation` (`constellation_id` ASC),
  INDEX `fk_star_star_type` (`star_type_id` ASC),
  CONSTRAINT `fk_star_constellation`
    FOREIGN KEY (`constellation_id`)
    REFERENCES `constellation` (`id`),
  CONSTRAINT `fk_star_star_type`
    FOREIGN KEY (`star_type_id`)
    REFERENCES `star_type` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `planet`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `planet` ;

CREATE TABLE IF NOT EXISTS `planet` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `about` TEXT NULL DEFAULT NULL,
  `image_url` VARCHAR(2000) NULL DEFAULT NULL,
  `enabled` TINYINT(4) NOT NULL,
  `star_id` INT(11) NULL DEFAULT NULL,
  `mass` INT(11) NULL DEFAULT NULL,
  `radius_km` INT(11) NULL DEFAULT NULL,
  `orbital_radius_AU` INT(11) NULL DEFAULT NULL,
  `orbital_circumference_AU` INT(11) NULL DEFAULT NULL,
  `create_date` DATETIME NOT NULL,
  `last_update` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_planet_star` (`star_id` ASC),
  CONSTRAINT `fk_planet_star`
    FOREIGN KEY (`star_id`)
    REFERENCES `star` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `satellite`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `satellite` ;

CREATE TABLE IF NOT EXISTS `satellite` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `about` TEXT NULL DEFAULT NULL,
  `image_url` VARCHAR(2000) NULL DEFAULT NULL,
  `natural_object` TINYINT(4) NULL DEFAULT NULL,
  `enabled` TINYINT(4) NOT NULL,
  `planet_id` INT(11) NULL DEFAULT NULL,
  `orbital_radius_km` INT(11) NULL DEFAULT NULL,
  `orbital_circumference_km` INT(11) NULL DEFAULT NULL,
  `create_date` DATETIME NOT NULL,
  `last_update` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_satellite_planet` (`planet_id` ASC),
  CONSTRAINT `fk_satellite_planet`
    FOREIGN KEY (`planet_id`)
    REFERENCES `planet` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;

SET SQL_MODE = '';
DROP USER IF EXISTS celestialuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'celestialuser'@'localhost' IDENTIFIED BY 'celestialuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'celestialuser'@'localhost';
GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'celestialuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `constellation`
-- -----------------------------------------------------
START TRANSACTION;
USE `celestialdb`;
INSERT INTO `constellation` (`id`, `name`, `about`, `image_url`, `enabled`, `create_date`, `last_update`) VALUES (1, 'Ursa Major', 'Also known as \"The Great Bear\", Ursa Major is the third largest constellation in the northern sky. Ursa Major contains the asterism known as \"The Big Dipper\" and is unique in that it holds large significance to many cultures around the world', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Ursa_Major_IAU.svg/2560px-Ursa_Major_IAU.svg.png', 1, '2024-01-06 00:00:00', '2024-01-06 00:00:00');
INSERT INTO `constellation` (`id`, `name`, `about`, `image_url`, `enabled`, `create_date`, `last_update`) VALUES (2, 'Ursa Minor', 'Also known as \"The Little Bear\", Ursa Minor contains the asterism known as \"The Little Dipper\". Ursa Minor contains the North Star, Polaris, making extremely useful in navigating.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Ursa_Minor_IAU.svg/1920px-Ursa_Minor_IAU.svg.png', 1, '2024-01-06 00:00:00', '2024-01-06 00:00:00');
INSERT INTO `constellation` (`id`, `name`, `about`, `image_url`, `enabled`, `create_date`, `last_update`) VALUES (3, 'Canis Major', 'Canis Major is a constellation in the southern celestial hemisphere. It is often depicted as \"following\" the constellation Orion. Canis Major contains the brightest star in the night sky, Sirus.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Canis_Major_IAU.svg/1920px-Canis_Major_IAU.svg.png', 1, '2024-01-06 00:00:00', '2024-01-06 00:00:00');
INSERT INTO `constellation` (`id`, `name`, `about`, `image_url`, `enabled`, `create_date`, `last_update`) VALUES (4, 'Canis Minor', 'Canis Minor is a constellation in the northern celestial hemisphere. It is a small constellation containing only two stars, Procyon and Gomeisa. ', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Canis_Minor_IAU.svg/1920px-Canis_Minor_IAU.svg.png', 1, '2024-01-06 00:00:00', '2024-01-06 00:00:00');
INSERT INTO `constellation` (`id`, `name`, `about`, `image_url`, `enabled`, `create_date`, `last_update`) VALUES (5, 'Orion', 'Orion is a very recognizable constellation, easily seen in the winter in the northern hemisphere. It is named after the hunter Orion in Greek mythology. Orion contains two of the brightest stars in the night sky, Betelgeuse and Rigel.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Orion_IAU.svg/1920px-Orion_IAU.svg.png', 1, '2024-01-06 00:00:00', '2024-01-06 00:00:00');
INSERT INTO `constellation` (`id`, `name`, `about`, `image_url`, `enabled`, `create_date`, `last_update`) VALUES (6, 'Aries', 'Aries is one of the zodiac constellations, located between Pices and Taurus. Aries is latin for \"The Ram\", but has formed many shapes in different cultures including a farmhand and a porpoise.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Aries_IAU.svg/1920px-Aries_IAU.svg.png', 1, '2024-01-06 00:00:00', '2024-01-06 00:00:00');

COMMIT;


-- -----------------------------------------------------
-- Data for table `star_type`
-- -----------------------------------------------------
START TRANSACTION;
USE `celestialdb`;
INSERT INTO `star_type` (`id`, `name`, `about`, `image_url`, `main_sequence`, `enabled`, `create_date`, `last_update`) VALUES (1, 'Yellow Dwarf', 'A medium sized star that fuses hydrogen and hellium, with a lifespan of about 10 billion years', 'https://upload.wikimedia.org/wikipedia/commons/8/81/Yellow_dwarf_star_image_1.png', 1, 1, '2024-01-06 00:00:00', '2024-01-06 00:00:00');
INSERT INTO `star_type` (`id`, `name`, `about`, `image_url`, `main_sequence`, `enabled`, `create_date`, `last_update`) VALUES (2, 'Red Giant', 'A low to medium mass star that forms after a star has run out of hydrogen fuel and approaches the end of it\'s life, causing the star to become bright and large in diameter.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/VX_Sagittarii_Red_Supergiant_Star.png/1200px-VX_Sagittarii_Red_Supergiant_Star.png', 1, 1, '2024-01-06 00:00:00', '2024-01-06 00:00:00');
INSERT INTO `star_type` (`id`, `name`, `about`, `image_url`, `main_sequence`, `enabled`, `create_date`, `last_update`) VALUES (3, 'Black Hole', 'Similar to with a neutron star, when a star dies with a mass of greater than 2.1 solar_masses, it will explode in a supernova. What remains in an incredibly dense mass known as a Black Hole', 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg', 0, 1, '2024-01-06 00:00:00', '2024-01-06 00:00:00');
INSERT INTO `star_type` (`id`, `name`, `about`, `image_url`, `main_sequence`, `enabled`, `create_date`, `last_update`) VALUES (4, 'White Dwarf', 'A Star that has run out of hydrogen fuel but lacks the mass to force higher elements to fuse, this causes the star to collapse inward due to its gravitational pull.', 'https://upload.wikimedia.org/wikipedia/commons/1/18/Sirius_A_and_B_Hubble_photo.editted.PNG', 0, 1, '2024-01-06 00:00:00', '2024-01-06 00:00:00');
INSERT INTO `star_type` (`id`, `name`, `about`, `image_url`, `main_sequence`, `enabled`, `create_date`, `last_update`) VALUES (5, 'Neutron Star', 'When a star dies with a mass of 1.35 and 2.1 Solar Masses, it will explode outward in a supernova. What remains is a star composed entirely of neutrons', 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Moving_heart_of_the_Crab_Nebula.jpg', 0, 1, '2024-01-06 00:00:00', '2024-01-06 00:00:00');
INSERT INTO `star_type` (`id`, `name`, `about`, `image_url`, `main_sequence`, `enabled`, `create_date`, `last_update`) VALUES (6, 'Supergiant', 'The Largest stars in the universe. Supergiants fuse hydrogen at an incredible rate, living only a few million years before going supernova.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/VX_Sagittarii_Red_Supergiant_Star.png/1200px-VX_Sagittarii_Red_Supergiant_Star.png', 0, 1, '2024-01-06 00:00:00', '2024-01-06 00:00:00');
INSERT INTO `star_type` (`id`, `name`, `about`, `image_url`, `main_sequence`, `enabled`, `create_date`, `last_update`) VALUES (7, 'Protostar', 'The precursor to a star, a protostar is a collection of gas that has not yet collapsed down into a star. Protostars last about 100,000 years before starting to collapse into a star', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/L1527.tif/lossy-page1-1920px-L1527.tif.jpg', 0, 1, '2024-01-06 00:00:00', '2024-01-06 00:00:00');
INSERT INTO `star_type` (`id`, `name`, `about`, `image_url`, `main_sequence`, `enabled`, `create_date`, `last_update`) VALUES (8, 'T Tauri Star', 'An early stage star taht occurs after the Protostar phase. The gravitational forces provide the star with energy, but are not high enough to start fusion. They are large and bright last about 100 million years.', 'https://upload.wikimedia.org/wikipedia/commons/b/b0/TTauriStarDrawing.jpg', 0, 1, '2024-01-06 00:00:00', '2024-01-06 00:00:00');
INSERT INTO `star_type` (`id`, `name`, `about`, `image_url`, `main_sequence`, `enabled`, `create_date`, `last_update`) VALUES (9, 'Red Dwarf', 'The most common type of star in the universe. Red Dwarf stars are main sequence stars that, but are lighter than other main sequence stars, and are cooler as a result, allwoing them to conserve fuel for longer periods of time.', 'https://upload.wikimedia.org/wikipedia/commons/3/3d/AU_MIc_M-dwarf_artist%27s_conception.jpg', 1, 1, '2024-01-06 00:00:00', '2024-01-06 00:00:00');

COMMIT;


-- -----------------------------------------------------
-- Data for table `star`
-- -----------------------------------------------------
START TRANSACTION;
USE `celestialdb`;
INSERT INTO `star` (`id`, `name`, `about`, `image_url`, `enabled`, `right_ascension`, `declination`, `constellation_id`, `star_type_id`, `age_billion_years`, `lifetime_billion_years`, `create_date`, `last_update`, `solar_masses`, `luminosity`, `radius`) VALUES (1, 'Sun', 'Also called \"Sol\" or \"Helios\", the Sun is the star at the center of our solar system.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/The_Sun_in_white_light.jpg/1920px-The_Sun_in_white_light.jpg', 1, NULL, NULL, NULL, 1, '4.5', '10', '2024-01-06 00:00:00', '2024-01-06 00:00:00', 1, 1, 1);
INSERT INTO `star` (`id`, `name`, `about`, `image_url`, `enabled`, `right_ascension`, `declination`, `constellation_id`, `star_type_id`, `age_billion_years`, `lifetime_billion_years`, `create_date`, `last_update`, `solar_masses`, `luminosity`, `radius`) VALUES (2, 'Polaris A', 'Also known as the north star, Polaris can be found inline with the Earths rotational axis in the northern sky.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Ursa_Minor_constellation_map.svg/1920px-Ursa_Minor_constellation_map.svg.png', 1, NULL, NULL, 2, 6, '0.045', NULL, '2024-01-06 00:00:00', '2024-01-06 00:00:00', 7, 1260, 32);
INSERT INTO `star` (`id`, `name`, `about`, `image_url`, `enabled`, `right_ascension`, `declination`, `constellation_id`, `star_type_id`, `age_billion_years`, `lifetime_billion_years`, `create_date`, `last_update`, `solar_masses`, `luminosity`, `radius`) VALUES (3, 'Sagittarius A', 'The supermassive black hole at the center of the Milky Way Galaxy', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/EHT_Saggitarius_A_black_hole.tif/lossy-page1-1920px-EHT_Saggitarius_A_black_hole.tif.jpg', 1, '268', '-29', NULL, 3, '13.7', '1e78', '2024-01-06 00:00:00', '2024-01-06 00:00:00', 4297000, 0, 17);
INSERT INTO `star` (`id`, `name`, `about`, `image_url`, `enabled`, `right_ascension`, `declination`, `constellation_id`, `star_type_id`, `age_billion_years`, `lifetime_billion_years`, `create_date`, `last_update`, `solar_masses`, `luminosity`, `radius`) VALUES (4, 'Cygnus X-1', 'A binary star system containing a blue supergiant and a black hole. The interaction between these two stars cause it to be very bright and hot. Cygnus X-1 has been refereced in many forms of media, such as two Rush songs and an episode of Futurama', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Chandra_image_of_Cygnus_X-1.jpg/1920px-Chandra_image_of_Cygnus_X-1.jpg', 1, '300', '35', NULL, 6, '0.005', '0.01', '2024-01-06 00:00:00', '2024-01-06 00:00:00', 21, 340000, 21);

COMMIT;


-- -----------------------------------------------------
-- Data for table `planet`
-- -----------------------------------------------------
START TRANSACTION;
USE `celestialdb`;
INSERT INTO `planet` (`id`, `name`, `about`, `image_url`, `enabled`, `star_id`, `mass`, `radius_km`, `orbital_radius_AU`, `orbital_circumference_AU`, `create_date`, `last_update`) VALUES (1, 'Earth', '3rd planet from the sun, home to you, me, and everyone else.', NULL, 1, 1, NULL, 6371, 1, 6, '2024-01-06 00:00:00', '2024-01-06 00:00:00');
INSERT INTO `planet` (`id`, `name`, `about`, `image_url`, `enabled`, `star_id`, `mass`, `radius_km`, `orbital_radius_AU`, `orbital_circumference_AU`, `create_date`, `last_update`) VALUES (2, 'Mercury', '1st planet from the sun, very hot in the day and cold at night. It\'s orbit is shorter than it\'s day.', NULL, 1, 1, NULL, 3000, 0, 3, '2024-01-06 00:00:00', '2024-01-06 00:00:00');
INSERT INTO `planet` (`id`, `name`, `about`, `image_url`, `enabled`, `star_id`, `mass`, `radius_km`, `orbital_radius_AU`, `orbital_circumference_AU`, `create_date`, `last_update`) VALUES (3, 'Venus', '2nd planet from the sun. Often considered Earth\'s sister planet due to its similar size. Venus rotates the opposite direction to the all other planets in the solar system.', NULL, 1, 1, NULL, 6000, 1, 5, '2024-01-06 00:00:00', '2024-01-06 00:00:00');
INSERT INTO `planet` (`id`, `name`, `about`, `image_url`, `enabled`, `star_id`, `mass`, `radius_km`, `orbital_radius_AU`, `orbital_circumference_AU`, `create_date`, `last_update`) VALUES (4, 'Mars', '4th planet from the sun, Mars is often looked at as a potentially habitable planet for the future of humanity', NULL, 1, 1, NULL, 5000, 2, 9, '2024-01-06 00:00:00', '2024-01-06 00:00:00');

COMMIT;


-- -----------------------------------------------------
-- Data for table `satellite`
-- -----------------------------------------------------
START TRANSACTION;
USE `celestialdb`;
INSERT INTO `satellite` (`id`, `name`, `about`, `image_url`, `natural_object`, `enabled`, `planet_id`, `orbital_radius_km`, `orbital_circumference_km`, `create_date`, `last_update`) VALUES (1, 'Moon', 'Natural body orbiting the Earth', NULL, 1, 1, 1, 384400, 2415256, '2024-01-06 00:00:00', '2024-01-06 00:00:00');

COMMIT;

