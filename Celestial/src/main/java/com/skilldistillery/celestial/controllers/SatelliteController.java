package com.skilldistillery.celestial.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.celestial.entities.Satellite;
import com.skilldistillery.celestial.entities.Satellite;
import com.skilldistillery.celestial.services.SatelliteService;

@RestController
@RequestMapping("api")
public class SatelliteController {

	@Autowired
	private SatelliteService satelliteService;
	
	@GetMapping(path = {"satellites", "satellites/"})
	public List<Satellite> findAllEnabledSatellites(){
		return satelliteService.listAllEnabled();
	}
	@GetMapping("admin/satellites")
	public List<Satellite> findAllSatellites(){
		return satelliteService.listAll();
	}
	@GetMapping("admin/satellites/{id}")
	public Satellite findSatellitesById(@PathVariable("id") int id){
		return satelliteService.selectSatellitesById(id);
	}
	@GetMapping("satellites/{id}")
	public Satellite findEnabledSatellitesById(@PathVariable("id") int id){
		return satelliteService.selectEnabledSatellitesById(id);
	}
	
	
	@PostMapping(path = {"satellites"})
	public Satellite createSatellite(@RequestBody Satellite satellite){
		return satelliteService.create(satellite);
	}
	@PutMapping("satellites/{id}")
	public Satellite updateSatellite(@PathVariable("id") int id, @RequestBody Satellite satellite){
		return satelliteService.update(id, satellite);
	}
	@DeleteMapping(path = {"satellites/{id}"})
	public void deletetar(@PathVariable("id") int id){
		satelliteService.delete(id);
	}
	@PutMapping("satellites/{id}/enable")
	public void enableSatellite(@PathVariable("id") int id){
		 satelliteService.enable(id);
	}
	
}
