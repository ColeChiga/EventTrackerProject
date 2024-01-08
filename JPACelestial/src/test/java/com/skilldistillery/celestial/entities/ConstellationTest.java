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

class ConstellationTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Constellation constellation;
	
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
		constellation = em.find(Constellation.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		constellation=null;
	}

	@Test
	void test() {
		assertNotNull(constellation);
		assertEquals("Ursa Major", constellation.getName());
	}
	@Test
	void test_constellation_stare_relationships() {
		assertNotNull(constellation.getStars());
		assertEquals("Polaris", constellation.getStars().get(0).getName());
	}

}
