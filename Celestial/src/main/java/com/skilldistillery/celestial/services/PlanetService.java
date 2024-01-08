package com.skilldistillery.celestial.services;

import java.util.List;

import com.skilldistillery.celestial.entities.Planet;
import com.skilldistillery.celestial.entities.Satellite;

public interface PlanetService {
	List<Planet> listAll();
	List<Planet> listAllEnabled();
	Planet findById(int id);
	Planet create(Planet planet);
	Planet update(int id, Planet planet);
	boolean delete(int id);
	boolean enable(int id);
	Planet selectEnabledPlanetsById(int id);
	List<Planet> listAllPlanetsForStar(int id);
}
