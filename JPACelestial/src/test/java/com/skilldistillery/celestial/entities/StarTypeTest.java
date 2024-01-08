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

class StarTypeTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private StarType starType;
	
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
		starType = em.find(StarType.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		starType=null;
	}

	@Test
	void test() {
		assertNotNull(starType);
		assertEquals("Yellow Dwarf", starType.getName());
	}
	@Test
	void test_starType_star_relationship() {
		assertNotNull(starType.getStars());
		assertEquals("Polaris", starType.getStars().get(0).getName());
	}

}
