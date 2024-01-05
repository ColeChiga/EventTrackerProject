
DROP DATABASE IF EXISTS celestialdb;
CREATE DATABASE IF NOT EXISTS celestialdb;

USE celestialdb;

#
# TABLE STRUCTURE FOR: Person
#

CREATE TABLE Constellation (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(80) NOT NULL
);

CREATE TABLE star (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  about TEXT,
  image_url VARCHAR(1000),
  enabled TINYINT NOT NULL,
  constellation_id INTEGER,
  create_date DATETIME,
  last_update DATETIME

  NOT NULL,
  CONSTRAINT fk_star_constellation FOREIGN KEY (constellation_id) REFERENCES constellation (id)

);

DROP USER IF EXISTS celestialuser@localhost; 

CREATE USER IF NOT EXISTS celestialuser@localhost IDENTIFIED BY 'celestialuser';

GRANT SELECT, INSERT, UPDATE, DELETE ON celestialdb.* TO celestialuser@localhost;

START TRANSACTION;

INSERT INTO constellation (id, name)
  VALUES (1, "Ursa Major");

INSERT INTO star (id, name, about, image_url, enabled, constellation_id,create_date, last_update)
	   VALUES (1, 'Sol', 'The star at the center of our solar system', null, 1, null,'2024-01-05', '2024-01-05');

COMMIT;