
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
  main_sequence TINYINT,
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
  age_billion_years VARCHAR(6),
  lifetime_billion_years VARCHAR(6), 
  create_date DATETIME NOT NULL,
  last_update DATETIME NOT NULL,

  solar_masses INTEGER,
  luminosity INTEGER,
  radius INTEGER,

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

  mass INTEGER,
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

INSERT INTO star_type (id, name, about, image_url, main_sequence, enabled, create_date, last_update)
  VALUES  
          (1, "Yellow Dwarf", "A medium sized star that fuses hydrogen and hellium, with a lifespan of about 10 billion years", "https://upload.wikimedia.org/wikipedia/commons/8/81/Yellow_dwarf_star_image_1.png", 1, 1, "2024-01-06", "2024-01-06"),
          (2, "Red Giant", "A low to medium mass star that forms after a star has run out of hydrogen fuel and approaches the end of it's life, causing the star to become bright and large in diameter.", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/VX_Sagittarii_Red_Supergiant_Star.png/1200px-VX_Sagittarii_Red_Supergiant_Star.png", 1, 1, "2024-01-06", "2024-01-06"),
          (3, "Black Hole", "Similar to with a neutron star, when a star dies with a mass of greater than 2.1 solar_masses, it will explode in a supernova. What remains in an incredibly dense mass known as a Black Hole", "https://upload.wikimedia.org/wikipedia/commons/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg", 0, 1, "2024-01-06", "2024-01-06"),
          (4, "White Dwarf", "A Star that has run out of hydrogen fuel but lacks the mass to force higher elements to fuse, this causes the star to collapse inward due to its gravitational pull.", "https://upload.wikimedia.org/wikipedia/commons/1/18/Sirius_A_and_B_Hubble_photo.editted.PNG", 0, 1, "2024-01-06", "2024-01-06"),
          (5, "Neutron Star", "When a star dies with a mass of 1.35 and 2.1 Solar Masses, it will explode outward in a supernova. What remains is a star composed entirely of neutrons", "https://upload.wikimedia.org/wikipedia/commons/8/8c/Moving_heart_of_the_Crab_Nebula.jpg", 0, 1, "2024-01-06", "2024-01-06"),
          (6, "Supergiant", "The Largest stars in the universe. Supergiants fuse hydrogen at an incredible rate, living only a few million years before going supernova.", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/VX_Sagittarii_Red_Supergiant_Star.png/1200px-VX_Sagittarii_Red_Supergiant_Star.png", 0, 1, "2024-01-06", "2024-01-06"),
          (7, "Protostar", "The precursor to a star, a protostar is a collection of gas that has not yet collapsed down into a star. Protostars last about 100,000 years before starting to collapse into a star", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/L1527.tif/lossy-page1-1920px-L1527.tif.jpg", 0, 1, "2024-01-06", "2024-01-06"),
          (8, "T Tauri Star", "An early stage star taht occurs after the Protostar phase. The gravitational forces provide the star with energy, but are not high enough to start fusion. They are large and bright last about 100 million years.", "https://upload.wikimedia.org/wikipedia/commons/b/b0/TTauriStarDrawing.jpg", 0, 1, "2024-01-06", "2024-01-06"),
          (9, "Red Dwarf", "The most common type of star in the universe. Red Dwarf stars are main sequence stars that, but are lighter than other main sequence stars, and are cooler as a result, allwoing them to conserve fuel for longer periods of time.", "https://upload.wikimedia.org/wikipedia/commons/3/3d/AU_MIc_M-dwarf_artist%27s_conception.jpg", 1, 1, "2024-01-06", "2024-01-06");


INSERT INTO constellation (id, name, about, image_url, enabled, create_date, last_update)
  VALUES 
    (1, "Ursa Major", 'Also known as "The Great Bear", Ursa Major is the third largest constellation in the northern sky. Ursa Major contains the asterism known as "The Big Dipper" and is unique in that it holds large significance to many cultures around the world', "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Ursa_Major_IAU.svg/2560px-Ursa_Major_IAU.svg.png", 1, "2024-01-06", "2024-01-06"),
    (2, "Ursa Minor", 'Also known as "The Little Bear", Ursa Minor contains the asterism known as "The Little Dipper". Ursa Minor contains the North Star, Polaris, making extremely useful in navigating.', "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Ursa_Minor_IAU.svg/1920px-Ursa_Minor_IAU.svg.png", 1, "2024-01-06", "2024-01-06"),
    (3, "Canis Major", 'Canis Major is a constellation in the southern celestial hemisphere. It is often depicted as "following" the constellation Orion. Canis Major contains the brightest star in the night sky, Sirus.', "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Canis_Major_IAU.svg/1920px-Canis_Major_IAU.svg.png", 1, "2024-01-06", "2024-01-06"),
    (4, "Canis Minor", 'Canis Minor is a constellation in the northern celestial hemisphere. It is a small constellation containing only two stars, Procyon and Gomeisa. ', "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Canis_Minor_IAU.svg/1920px-Canis_Minor_IAU.svg.png", 1, "2024-01-06", "2024-01-06"),
    (5, "Orion", 'Orion is a very recognizable constellation, easily seen in the winter in the northern hemisphere. It is named after the hunter Orion in Greek mythology. Orion contains two of the brightest stars in the night sky, Betelgeuse and Rigel.', "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Orion_IAU.svg/1920px-Orion_IAU.svg.png", 1, "2024-01-06", "2024-01-06"),
    (6, "Aries", 'Aries is one of the zodiac constellations, located between Pices and Taurus. Aries is latin for "The Ram", but has formed many shapes in different cultures including a farmhand and a porpoise.', "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Aries_IAU.svg/1920px-Aries_IAU.svg.png", 1, "2024-01-06", "2024-01-06");

INSERT INTO star (id, name, about, image_url, enabled, right_ascension, declination, constellation_id, star_type_id, age_billion_years, lifetime_billion_years, create_date, last_update, solar_masses, luminosity, radius)
	   VALUES (1, 'Sun', 'Also called "Sol" or "Helios", the Sun is the star at the center of our solar system.', "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/The_Sun_in_white_light.jpg/1920px-The_Sun_in_white_light.jpg", 1, null, null, null, 1, 4.5, 10, '2024-01-06', '2024-01-06', 1, 1, 1),
            (2, 'Polaris A', "Also known as the north star, Polaris can be found inline with the Earths rotational axis in the northern sky.", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Ursa_Minor_constellation_map.svg/1920px-Ursa_Minor_constellation_map.svg.png", 1 ,null, null, 2, 6, 0.045, null, '2024-01-06', '2024-01-06', 7, 1260, 32),
            (3, 'Sagittarius A', "The supermassive black hole at the center of the Milky Way Galaxy", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/EHT_Saggitarius_A_black_hole.tif/lossy-page1-1920px-EHT_Saggitarius_A_black_hole.tif.jpg", 1 ,268, -29, null, 3, 13.7, "1e78", '2024-01-06', '2024-01-06', 4297000, 0, 17.249),
            (4, 'Cygnus X-1', "A binary star system containing a blue supergiant and a black hole. The interaction between these two stars cause it to be very bright and hot. Cygnus X-1 has been refereced in many forms of media, such as two Rush songs and an episode of Futurama.", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Chandra_image_of_Cygnus_X-1.jpg/1920px-Chandra_image_of_Cygnus_X-1.jpg", 1 , 300, 35, null, 6, 0.005, 0.01, '2024-01-06', '2024-01-06', 21.2, 340000, 21);

INSERT INTO planet (id, name, about, image_url, enabled, star_id, mass, radius_km, orbital_radius_AU, orbital_circumference_AU, create_date, last_update)
  VALUES (1, "Earth", "3rd planet from the sun, home to you, me, and everyone else.", null, 1, 1, null, 6371,1, 6.28, "2024-01-06", "2024-01-06"),
         (2, "Mercury", "1st planet from the sun, very hot in the day and cold at night. It's orbit is shorter than it's day.", null, 1, 1, null, 3000, .45, 2.89, "2024-01-06", "2024-01-06"),
         (3, "Venus", "2nd planet from the sun. Often considered Earth's sister planet due to its similar size. Venus rotates the opposite direction to the all other planets in the solar system.", null, 1, 1, null, 6000, 0.75, 4.98, "2024-01-06", "2024-01-06"),
         (4, "Mars", "4th planet from the sun, Mars is often looked at as a potentially habitable planet for the future of humanity", null, 1, 1, null, 5000, 1.5, 8.56, "2024-01-06", "2024-01-06");

INSERT INTO satellite (id, name, about, image_url, natural_object, enabled, planet_id, orbital_radius_km, orbital_circumference_km, create_date, last_update)
  VALUES (1, "Moon", "Natural body orbiting the Earth", null, 1, 1, 1, 384400, 2415256, "2024-01-06", "2024-01-06");

COMMIT;