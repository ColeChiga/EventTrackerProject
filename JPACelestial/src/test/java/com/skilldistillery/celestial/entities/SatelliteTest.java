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

class SatelliteTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Satellite satellite;
	
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
		satellite = em.find(Satellite.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		satellite=null;
	}

	@Test
	void test() {
		assertNotNull(satellite);
		assertEquals("Moon", satellite.getName());
	}
	@Test
	void test_Satellite_planet_relationship() {
		assertNotNull(satellite);
		assertEquals("Earth", satellite.getPlanet().getName());
	}

}
