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

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
public class PlanetController {

	@Autowired
	private PlanetService planetService;
	
	@GetMapping(path = { "planets", "planets/" })
	public List<Planet> findAllEnabledPlanets(HttpServletResponse resp) {
		List<Planet> planets = planetService.listAllEnabled();
		if (!planets.isEmpty()) {
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
		return planets;
	}

	@GetMapping("admin/planets")
	public List<Planet> findAllPlanets(HttpServletResponse resp) {
		List<Planet> planets = planetService.listAll();
		if (!planets.isEmpty()) {
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
		return planets;
	}

	@GetMapping("admin/planets/{id}")
	public Planet findPlanetsById(@PathVariable("id") int id, HttpServletResponse resp) {
		Planet planet = planetService.findById(id);
		if (planet != null) {
			resp.setStatus(200);
		} else {
			resp.setStatus(400);
		}
		return planet;
	}

	@GetMapping("planets/{id}")
	public Planet findEnabledPlanetsById(@PathVariable("id") int id, HttpServletResponse resp) {
		Planet planet = planetService.selectEnabledPlanetsById(id);
		if (planet != null) {
			resp.setStatus(200);
		} else {
			resp.setStatus(400);
		}
		return planet;
	}

	@PostMapping(path = { "planets" })
	public Planet createPlanet(@RequestBody Planet planet, HttpServletResponse resp) {
		try {
			planet = planetService.create(planet);

			resp.setStatus(200);
		} catch (Exception e) {
			resp.setStatus(400);
			planet = null;
			e.printStackTrace();
		}

		return planet;
	}

	@PutMapping("planets/{id}")
	public Planet updatePlanet(@PathVariable("id") int id, @RequestBody Planet planet,
			HttpServletResponse resp) {
		try {
			planet = planetService.update(id, planet);
			if (planet != null)
			{
				resp.setStatus(200);
			}
			else {
				resp.setStatus(400);
			}
		} catch (Exception e) {
			resp.setStatus(400);
			planet = null;
			e.printStackTrace();
		}
		return planet;
	}

	@DeleteMapping(path = { "planets/{id}" })
	public void deletetar(@PathVariable("id") int id, HttpServletResponse resp) {

		try {
			boolean deleted = planetService.delete(id);
			if (deleted) {
				resp.setStatus(200);
			}
			else {
				resp.setStatus(400);				
			}
		} catch (Exception e) {
			resp.setStatus(400);
			e.printStackTrace();
		}
	}

	@PutMapping("planets/{id}/enable")
	public void enablePlanet(@PathVariable("id") int id, HttpServletResponse resp) {
		try {
			boolean enabled = planetService.enable(id);
			if (enabled) {
				resp.setStatus(200);
			}
			else {
				resp.setStatus(400);				
			}
		} catch (Exception e) {
			resp.setStatus(400);
			e.printStackTrace();
		}
	}
}
