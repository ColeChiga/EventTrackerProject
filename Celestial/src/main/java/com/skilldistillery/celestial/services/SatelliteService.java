package com.skilldistillery.celestial.services;

import java.util.List;

import com.skilldistillery.celestial.entities.Satellite;

public interface SatelliteService {
	List<Satellite> listAll();
	List<Satellite> listAllEnabled();
	Satellite findById(int id);
	Satellite create(Satellite satellite);
	Satellite update(int id, Satellite satellite);
	boolean delete(int id);
	boolean enable(int id);
	Satellite selectEnabledSatellitesById(int id);
}
