
DROP DATABASE IF EXISTS familytreedb;
CREATE DATABASE IF NOT EXISTS familytreedb;

USE familytreedb;

#
# TABLE STRUCTURE FOR: Person
#

CREATE TABLE person (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  about TEXT,
  date_of_birth DATE,
  father_id int(10),
  mother_id int(10),
  img_url VARCHAR(1000),
  enabled TINYINT NOT NULL,
  create_date DATETIME,
  last_update DATETIME
);

DROP USER IF EXISTS familyuser@localhost; 

CREATE USER IF NOT EXISTS familyuser@localhost IDENTIFIED BY 'familyuser';

GRANT SELECT, INSERT, UPDATE, DELETE ON familytreedb.* TO familyuser@localhost;

START TRANSACTION;
INSERT INTO person (id, first_name, last_name, about, date_of_birth, father_id, mother_id, img_url, enabled, create_date, last_update)
	   VALUES (1, 'John', 'Doe', null, null, null, null, null, 1, '2024-01-05', '2024-01-05');

COMMIT;