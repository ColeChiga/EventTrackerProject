package com.skilldistillery.celestial.services;

import java.util.List;

import com.skilldistillery.celestial.entities.StarType;

public interface StarTypeService {
	List<StarType> listAll();
	List<StarType> listAllEnabled();
	StarType findById(int id);
	StarType create(StarType starType);
	StarType update(int id, StarType starType);
	boolean delete(int id);
	boolean enable(int id);
}
