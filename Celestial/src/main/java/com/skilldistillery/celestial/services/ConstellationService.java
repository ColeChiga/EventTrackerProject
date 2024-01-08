package com.skilldistillery.celestial.services;

import java.util.List;

import com.skilldistillery.celestial.entities.Constellation;

public interface ConstellationService {
	List<Constellation> listAll();
	List<Constellation> listAllEnabled();
	Constellation findById(int id);
	Constellation create(Constellation constellation);
	Constellation update(int id, Constellation constellation);
	boolean delete(int id);
	boolean enable(int id);
	Constellation selectEnabledConstellationsById(int id);
}
