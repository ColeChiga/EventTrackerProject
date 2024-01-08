package com.skilldistillery.celestial.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.celestial.entities.StarType;
import com.skilldistillery.celestial.repositories.StarTypeRepository;

@Service
public class StarTypeServiceImpl implements StarTypeService {

	@Autowired
	StarTypeRepository starRepo;
	
	@Override
	public List<StarType> listAll() {
		return starRepo.findAll();
	}

	@Override
	public List<StarType> listAllEnabled() {
		return starRepo.searchByEnabled(true);
	}

	@Override
	public StarType findById(int id) {
		Optional<StarType> optStarType = starRepo.findById(id);
		if (optStarType.isPresent()) {
			return optStarType.get();
		}
		else {
			return null;			
		}
	}

	@Override
	public StarType create(StarType star) {
		return starRepo.saveAndFlush(star);
	}

	@Override
	public StarType update(int id, StarType star) {
		if(starRepo.findById(id).isPresent()) {
			return starRepo.saveAndFlush(star);
		} else {
			return null;
		}
	}

	@Override
	public boolean delete(int id) {
	Optional<StarType> optStarType = starRepo.findById(id);
		if (optStarType.isPresent()) {
			StarType star = optStarType.get();
			star.setEnabled(false);
			starRepo.saveAndFlush(star);
			return true;
		}
		else {
			return false;			
		}
	}
	@Override
	public boolean enable(int id) {
		Optional<StarType> optStarType = starRepo.findById(id);
		if (optStarType.isPresent()) {
			StarType star = optStarType.get();
			star.setEnabled(true);
			starRepo.saveAndFlush(star);
			return true;
		}
		else {
			return false;			
		}
	}


}
