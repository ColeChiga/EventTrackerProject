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

import com.skilldistillery.celestial.entities.Star;
import com.skilldistillery.celestial.services.StarService;

@RestController
@RequestMapping("api")
public class SatelliteController {

	@Autowired
	private StarService starService;
	
	@GetMapping(path = {"stars", "stars/"})
	public List<Star> findAllEnabledStars(){
		return starService.listAllEnabled();
	}
	@GetMapping("admin/stars")
	public List<Star> findAllStars(){
		return starService.listAll();
	}
	
	@PostMapping(path = {"stars"})
	public Star createStar(@RequestBody Star star){
		return starService.create(star);
	}
	@PutMapping("stars/{id}")
	public Star updateStar(@PathVariable("id") int id, @RequestBody Star star){
		return starService.update(id, star);
	}
	@DeleteMapping(path = {"stars/{id}"})
	public void deletetar(@PathVariable("id") int id){
		starService.delete(id);
	}
	@PutMapping("stars/{id}/enable")
	public void enableStar(@PathVariable("id") int id){
		 starService.enable(id);
	}
	
}
