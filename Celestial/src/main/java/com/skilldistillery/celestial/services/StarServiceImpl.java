package com.skilldistillery.celestial.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.celestial.entities.Star;
import com.skilldistillery.celestial.repositories.StarRepository;

@Service
public class StarServiceImpl implements StarService {

	@Autowired
	StarRepository starRepo;
	
	@Override
	public List<Star> listAll() {
		return starRepo.findAll();
	}

	@Override
	public List<Star> listAllEnabled() {
		return starRepo.searchByEnabled(true);
	}

	@Override
	public Star findById(int id) {
		Optional<Star> optStar = starRepo.findById(id);
		if (optStar.isPresent()) {
			return optStar.get();
		}
		else {
			return null;			
		}
	}

	@Override
	public Star create(Star star) {
		return starRepo.saveAndFlush(star);
	}

	@Override
	public Star update(int id, Star star) {
		if(starRepo.findById(id).isPresent()) {
			return starRepo.saveAndFlush(star);
		} else {
			return null;
		}
	}

	@Override
	public boolean delete(int id) {
	Optional<Star> optStar = starRepo.findById(id);
		if (optStar.isPresent()) {
			Star star = optStar.get();
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
		Optional<Star> optStar = starRepo.findById(id);
		if (optStar.isPresent()) {
			Star star = optStar.get();
			star.setEnabled(true);
			starRepo.saveAndFlush(star);
			return true;
		}
		else {
			return false;			
		}
	}


}
