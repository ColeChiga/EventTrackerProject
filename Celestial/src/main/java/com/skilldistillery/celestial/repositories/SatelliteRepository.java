package com.skilldistillery.celestial.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.celestial.entities.Satellite;

public interface SatelliteRepository extends JpaRepository<Satellite, Integer>{
	List<Satellite> searchByEnabled(boolean enabled);
}
