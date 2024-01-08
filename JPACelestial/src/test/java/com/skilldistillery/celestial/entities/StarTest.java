package com.skilldistillery.celestial.entities;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class StarTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Star star;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPACelestial");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		star = em.find(Star.class, 2);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		star=null;
	}

	@Test
	void test() {
		assertNotNull(star);
		assertEquals("Polaris", star.getName());
	}
	@Test
	void test_star_starType_relationship() {
		assertNotNull(star);
		assertEquals("Yellow Dwarf", star.getStarType().getName());
	}
	@Test
	void test_star_constellation_relationship() {
		assertNotNull(star);
		assertEquals("Ursa Major", star.getConstellation().getName());
	}
	@Test
	void test_star_planet_relationship() {
		star=em.find(Star.class, 1);
		assertNotNull(star.getPlanets());
		assertEquals("Earth", star.getPlanets().get(0).getName());
	}

}
