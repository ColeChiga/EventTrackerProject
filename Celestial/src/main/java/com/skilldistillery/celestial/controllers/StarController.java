package com.skilldistillery.celestial.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.celestial.entities.Star;
import com.skilldistillery.celestial.services.StarService;

@RestController
@RequestMapping("api")
public class StarController {

	@Autowired
	private StarService starService;
	
	@GetMapping(path = {"stars", "stars/"})
	public List<Star> findAllStars(){
		return starService.listAll();
	}
	
}
