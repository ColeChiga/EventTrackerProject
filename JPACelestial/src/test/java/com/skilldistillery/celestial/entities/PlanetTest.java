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

class PlanetTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Planet planet;
	
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
		planet = em.find(Planet.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		planet=null;
	}

	@Test
	void test() {
		assertNotNull(planet);
		assertEquals("Earth", planet.getName());
	}
	@Test
	void test_planet_sun_relationship() {
		assertNotNull(planet.getStar());
		assertEquals("Sun", planet.getStar().getName());
	}
	@Test
	void test_planet_satellite() {
		assertNotNull(planet);
		assertEquals("Moon", planet.getSatellites().get(0).getName());
	}

}
