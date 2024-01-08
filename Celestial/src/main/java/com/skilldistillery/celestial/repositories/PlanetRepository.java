package com.skilldistillery.celestial.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.celestial.entities.Planet;

public interface PlanetRepository extends JpaRepository<Planet, Integer>{
	List<Planet> searchByEnabled(boolean enabled);

	Planet searchByIdAndEnabled(int id, boolean enabled);

	List<Planet> searchByStarId(int id);
}
