package com.skilldistillery.celestial.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.celestial.entities.Planet;
import com.skilldistillery.celestial.repositories.PlanetRepository;

@Service
public class PlanetServiceImpl implements PlanetService {

	@Autowired
	PlanetRepository planetRepo;

	@Override
	public List<Planet> listAll() {
		return planetRepo.findAll();
	}

	@Override
	public List<Planet> listAllEnabled() {
		return planetRepo.searchByEnabled(true);
	}

	@Override
	public Planet findById(int id) {
		Optional<Planet> optPlanet = planetRepo.findById(id);
		if (optPlanet.isPresent()) {
			return optPlanet.get();
		} else {
			return null;
		}
	}

	@Override
	public Planet create(Planet planet) {
		return planetRepo.saveAndFlush(planet);
	}

	@Override
	public Planet update(int id, Planet planet) {
		if (planetRepo.findById(id).isPresent()) {
			return planetRepo.saveAndFlush(planet);
		} else {
			return null;
		}
	}

	@Override
	public boolean delete(int id) {
		Optional<Planet> optPlanet = planetRepo.findById(id);
		if (optPlanet.isPresent()) {
			Planet planet = optPlanet.get();
			planet.setEnabled(false);
			planetRepo.saveAndFlush(planet);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public boolean enable(int id) {
		Optional<Planet> optPlanet = planetRepo.findById(id);
		if (optPlanet.isPresent()) {
			Planet planet = optPlanet.get();
			planet.setEnabled(true);
			planetRepo.saveAndFlush(planet);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public Planet selectEnabledPlanetsById(int id) {
		return planetRepo.searchByIdAndEnabled(id, true);
	}

}
