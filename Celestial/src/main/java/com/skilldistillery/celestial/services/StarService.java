package com.skilldistillery.celestial.services;

import java.util.List;

import com.skilldistillery.celestial.entities.Star;

public interface StarService {
	List<Star> listAll();
	Star findById();
	Star create(Star star);
	Star update(int id, Star star);
	boolean delete(int id);
}
