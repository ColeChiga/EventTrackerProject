package com.skilldistillery.celestial.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.celestial.entities.Constellation;
import com.skilldistillery.celestial.repositories.ConstellationRepository;

@Service
public class ConstellationServiceImpl implements ConstellationService {

	@Autowired
	ConstellationRepository constellationRepo;
	
	@Override
	public List<Constellation> listAll() {
		return constellationRepo.findAll();
	}

	@Override
	public List<Constellation> listAllEnabled() {
		return constellationRepo.searchByEnabled(true);
	}

	@Override
	public Constellation findById(int id) {
		Optional<Constellation> optConstellation = constellationRepo.findById(id);
		if (optConstellation.isPresent()) {
			return optConstellation.get();
		}
		else {
			return null;			
		}
	}

	@Override
	public Constellation create(Constellation constellation) {
		return constellationRepo.saveAndFlush(constellation);
	}

	@Override
	public Constellation update(int id, Constellation constellation) {
		if(constellationRepo.findById(id).isPresent()) {
			return constellationRepo.saveAndFlush(constellation);
		} else {
			return null;
		}
	}

	@Override
	public boolean delete(int id) {
	Optional<Constellation> optConstellation = constellationRepo.findById(id);
		if (optConstellation.isPresent()) {
			Constellation constellation = optConstellation.get();
			constellation.setEnabled(false);
			constellationRepo.saveAndFlush(constellation);
			return true;
		}
		else {
			return false;			
		}
	}
	@Override
	public boolean enable(int id) {
		Optional<Constellation> optConstellation = constellationRepo.findById(id);
		if (optConstellation.isPresent()) {
			Constellation constellation = optConstellation.get();
			constellation.setEnabled(true);
			constellationRepo.saveAndFlush(constellation);
			return true;
		}
		else {
			return false;			
		}
	}


}
