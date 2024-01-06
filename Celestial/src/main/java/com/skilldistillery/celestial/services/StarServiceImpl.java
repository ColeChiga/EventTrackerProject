package com.skilldistillery.celestial.services;

import java.util.List;

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
	public Star findById() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Star create(Star star) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Star update(int id, Star star) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(int id) {
		// TODO Auto-generated method stub
		return false;
	}

}
