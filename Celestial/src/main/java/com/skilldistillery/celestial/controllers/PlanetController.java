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

import com.skilldistillery.celestial.entities.Planet;
import com.skilldistillery.celestial.services.PlanetService;

@RestController
@RequestMapping("api")
public class PlanetController {

	@Autowired
	private PlanetService planetService;
	
	@GetMapping(path = {"planets", "planets/"})
	public List<Planet> findAllEnabledPlanets(){
		return planetService.listAllEnabled();
	}
	@GetMapping("admin/planets")
	public List<Planet> findAllPlanets(){
		return planetService.listAll();
	}
	@GetMapping("admin/planets/{id}")
	public Planet findPlanetsById(@PathVariable("id") int id){
		return planetService.selectPlanetsById(id);
	}
	@GetMapping("planets/{id}")
	public Planet findEnabledPlanetsById(@PathVariable("id") int id){
		return planetService.selectEnabledPlanetsById(id);
	}
	
	@PostMapping(path = {"planets"})
	public Planet createPlanet(@RequestBody Planet planet){
		return planetService.create(planet);
	}
	@PutMapping("planets/{id}")
	public Planet updatePlanet(@PathVariable("id") int id, @RequestBody Planet planet){
		return planetService.update(id, planet);
	}
	@DeleteMapping(path = {"planets/{id}"})
	public void deletetar(@PathVariable("id") int id){
		planetService.delete(id);
	}
	@PutMapping("planets/{id}/enable")
	public void enablePlanet(@PathVariable("id") int id){
		 planetService.enable(id);
	}
	
}
