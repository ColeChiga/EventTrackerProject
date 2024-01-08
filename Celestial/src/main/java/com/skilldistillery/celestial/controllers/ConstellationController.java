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

import com.skilldistillery.celestial.entities.Constellation;
import com.skilldistillery.celestial.entities.Constellation;
import com.skilldistillery.celestial.services.ConstellationService;

@RestController
@RequestMapping("api")
public class ConstellationController {

	@Autowired
	private ConstellationService constellationService;
	
	@GetMapping(path = {"constellations", "constellations/"})
	public List<Constellation> findAllEnabledConstellations(){
		return constellationService.listAllEnabled();
	}
	@GetMapping("admin/constellations")
	public List<Constellation> findAllConstellations(){
		return constellationService.listAll();
	}
	
	@GetMapping("admin/constellations/{id}")
	public Constellation findConstellationsById(@PathVariable("id") int id){
		return constellationService.selectConstellationsById(id);
	}
	@GetMapping("constellations/{id}")
	public Constellation findEnabledConstellationsById(@PathVariable("id") int id){
		return constellationService.selectEnabledConstellationsById(id);
	}
	
	@PostMapping(path = {"constellations"})
	public Constellation createConstellation(@RequestBody Constellation constellation){
		return constellationService.create(constellation);
	}
	@PutMapping("constellations/{id}")
	public Constellation updateConstellation(@PathVariable("id") int id, @RequestBody Constellation constellation){
		return constellationService.update(id, constellation);
	}
	@DeleteMapping(path = {"constellations/{id}"})
	public void deletetar(@PathVariable("id") int id){
		constellationService.delete(id);
	}
	@PutMapping("constellations/{id}/enable")
	public void enableConstellation(@PathVariable("id") int id){
		 constellationService.enable(id);
	}
	
}
