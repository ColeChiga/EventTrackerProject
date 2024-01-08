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

import com.skilldistillery.celestial.entities.StarType;
import com.skilldistillery.celestial.entities.StarType;
import com.skilldistillery.celestial.services.StarTypeService;

@RestController
@RequestMapping("api")
public class StarTypeController {

	@Autowired
	private StarTypeService starTypeService;
	
	@GetMapping(path = {"starTypes", "starTypes/"})
	public List<StarType> findAllEnabledStarTypes(){
		return starTypeService.listAllEnabled();
	}
	@GetMapping("admin/starTypes")
	public List<StarType> findAllStarTypes(){
		return starTypeService.listAll();
	}
	@GetMapping("admin/starTypes/{id}")
	public StarType findStarTypesById(@PathVariable("id") int id){
		return starTypeService.selectStarTypesById(id);
	}
	@GetMapping("starTypes/{id}")
	public StarType findEnabledStarTypesById(@PathVariable("id") int id){
		return starTypeService.selectEnabledStarTypesById(id);
	}
	
	@PostMapping(path = {"starTypes"})
	public StarType createStarType(@RequestBody StarType starType){
		return starTypeService.create(starType);
	}
	@PutMapping("starTypes/{id}")
	public StarType updateStarType(@PathVariable("id") int id, @RequestBody StarType starType){
		return starTypeService.update(id, starType);
	}
	@DeleteMapping(path = {"starTypes/{id}"})
	public void deletetar(@PathVariable("id") int id){
		starTypeService.delete(id);
	}
	@PutMapping("starTypes/{id}/enable")
	public void enableStarType(@PathVariable("id") int id){
		 starTypeService.enable(id);
	}
	
}
