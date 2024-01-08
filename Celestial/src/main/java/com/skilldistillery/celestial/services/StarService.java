package com.skilldistillery.celestial.services;

import java.util.List;

import com.skilldistillery.celestial.entities.Star;

public interface StarService {
	List<Star> listAll();
	List<Star> listAllEnabled();
	Star findById(int id);
	Star create(Star star);
	Star update(int id, Star star);
	boolean delete(int id);
	boolean enable(int id);
	Star selectEnabledStarsById(int id);
	Star selectStarsById(int id);
}
