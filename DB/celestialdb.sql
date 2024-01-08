
DROP DATABASE IF EXISTS celestialdb;
CREATE DATABASE IF NOT EXISTS celestialdb;

USE celestialdb;

#
# TABLE STRUCTURE FOR: Person
#

CREATE TABLE star_type (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  about TEXT,
  image_url VARCHAR(2000),
  enabled TINYINT NOT NULL,
  create_date DATETIME,
  last_update DATETIME
);

CREATE TABLE constellation (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  about TEXT,
  image_url VARCHAR(2000),
  enabled TINYINT NOT NULL,
  create_date DATETIME,
  last_update DATETIME
);

CREATE TABLE star (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  about TEXT,
  image_url VARCHAR(2000),
  enabled TINYINT NOT NULL,
  right_ascension VARCHAR(20),
  declination VARCHAR(20),
  constellation_id INTEGER,
  star_type_id INTEGER,
  age_billion_years INTEGER,
  lifetime_billion_years INTEGER, 
  create_date DATETIME NOT NULL,
  last_update DATETIME NOT NULL,
  CONSTRAINT fk_star_constellation FOREIGN KEY (constellation_id) REFERENCES constellation (id),
  CONSTRAINT fk_star_star_type FOREIGN KEY (star_type_id) REFERENCES star_type (id)
);

CREATE TABLE planet (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  about TEXT,
  image_url VARCHAR(2000),
  enabled TINYINT NOT NULL,
  star_id INTEGER,
  radius_km INTEGER,
  orbital_radius_AU INTEGER,
  orbital_circumference_AU INTEGER,
  create_date DATETIME NOT NULL,
  last_update DATETIME NOT NULL,
  CONSTRAINT fk_planet_star FOREIGN KEY (star_id) REFERENCES star (id)
);

CREATE TABLE satellite (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  about TEXT,
  image_url VARCHAR(2000),
  natural_object TINYINT,
  enabled TINYINT NOT NULL,
  planet_id INTEGER,
  orbital_radius_km INTEGER,
  orbital_circumference_km INTEGER,
  create_date DATETIME NOT NULL,
  last_update DATETIME NOT NULL,
  CONSTRAINT fk_satellite_planet FOREIGN KEY (planet_id) REFERENCES planet (id)
);

DROP USER IF EXISTS celestialuser@localhost; 

CREATE USER IF NOT EXISTS celestialuser@localhost IDENTIFIED BY 'celestialuser';

GRANT SELECT, INSERT, UPDATE, DELETE ON celestialdb.* TO celestialuser@localhost;

START TRANSACTION;

INSERT INTO star_type (id, name, about, image_url, enabled, create_date, last_update)
  VALUES  
          (1, "Yellow Dwarf", "A medium sized star that fuses hydrogen and hellium, with a lifespan of about 10 billion years", null, 1, "2024-01-06", "2024-01-06"),
          (2, "Red Giant", "A low to medium mass star that forms after a star has run out of hydrogen fuel and approaches the end of it's life, causing the star to become bright and large in diameter.", null, 1, "2024-01-06", "2024-01-06");

INSERT INTO constellation (id, name, about, image_url, enabled, create_date, last_update)
  VALUES (1, "Ursa Major", 'Also known as "The Great Bear", Ursa Major is the third largest constellation in the northern sky. Ursa Major contains the asterism known as "The Big Dipper" and is unique in that it holds large significance to many cultures around the world', null, 1, "2024-01-06", "2024-01-06");

INSERT INTO star (id, name, about, image_url, enabled, right_ascension, declination, constellation_id, star_type_id, age_billion_years, lifetime_billion_years, create_date, last_update)
	   VALUES (1, 'Sun', 'Also called "Sol" or "Helios", the Sun is the star at the center of our solar system.', null, 1, null, null, null, 1, 4.5, 10, '2024-01-06', '2024-01-06'),
            (2, 'Polaris', "Also known as the north star, Polaris can be found inline with the Earths rotational axis in the northern sky.", null, 1 ,null, null, 1, 1, null, null, '2024-01-06', '2024-01-06');

INSERT INTO planet (id, name, about, image_url, enabled, star_id, radius_km, orbital_radius_AU, orbital_circumference_AU, create_date, last_update)
  VALUES (1, "Earth", "3rd planet from the sun, home to you, me, and everyone else.", null, 1, 1, 6371,1, 6.28, "2024-01-06", "2024-01-06");

INSERT INTO satellite (id, name, about, image_url, natural_object, enabled, planet_id, orbital_radius_km, orbital_circumference_km, create_date, last_update)
  VALUES (1, "Moon", "Natural body orbiting the Earth", null, 1, 1, 1, 384400, 2415256, "2024-01-06", "2024-01-06");

COMMIT;