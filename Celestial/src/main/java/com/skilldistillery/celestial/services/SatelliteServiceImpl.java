package com.skilldistillery.celestial.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.celestial.entities.Satellite;
import com.skilldistillery.celestial.entities.Satellite;
import com.skilldistillery.celestial.repositories.SatelliteRepository;

@Service
public class SatelliteServiceImpl implements SatelliteService {

	@Autowired
	SatelliteRepository satelliteRepo;
	
	@Override
	public List<Satellite> listAll() {
		return satelliteRepo.findAll();
	}

	@Override
	public List<Satellite> listAllEnabled() {
		return satelliteRepo.searchByEnabled(true);
	}

	@Override
	public Satellite findById(int id) {
		Optional<Satellite> optSatellite = satelliteRepo.findById(id);
		if (optSatellite.isPresent()) {
			return optSatellite.get();
		}
		else {
			return null;			
		}
	}

	@Override
	public Satellite create(Satellite satellite) {
		return satelliteRepo.saveAndFlush(satellite);
	}

	@Override
	public Satellite update(int id, Satellite satellite) {
		if(satelliteRepo.findById(id).isPresent()) {
			return satelliteRepo.saveAndFlush(satellite);
		} else {
			return null;
		}
	}

	@Override
	public boolean delete(int id) {
	Optional<Satellite> optSatellite = satelliteRepo.findById(id);
		if (optSatellite.isPresent()) {
			Satellite satellite = optSatellite.get();
			satellite.setEnabled(false);
			satelliteRepo.saveAndFlush(satellite);
			return true;
		}
		else {
			return false;			
		}
	}
	@Override
	public boolean enable(int id) {
		Optional<Satellite> optSatellite = satelliteRepo.findById(id);
		if (optSatellite.isPresent()) {
			Satellite satellite = optSatellite.get();
			satellite.setEnabled(true);
			satelliteRepo.saveAndFlush(satellite);
			return true;
		}
		else {
			return false;			
		}
	}


	@Override
	public Satellite selectEnabledSatellitesById(int id) {
		Satellite optSatellite = satelliteRepo.searchByIdAndEnabled(id, true);
			return optSatellite;
		
	}

	@Override
	public List<Satellite> listAllSatellitesForPlanet(int id) {
		return satelliteRepo.searchByPlanetId(id);
	}


}
