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
import com.skilldistillery.celestial.services.ConstellationService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
public class ConstellationController {

	@Autowired
	private ConstellationService constellationService;

	@GetMapping(path = { "constellations", "constellations/" })
	public List<Constellation> findAllEnabledConstellations(HttpServletResponse resp) {
		List<Constellation> constellations = constellationService.listAllEnabled();
		if (!constellations.isEmpty()) {
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
		return constellations;
	}

	@GetMapping("admin/constellations")
	public List<Constellation> findAllConstellations(HttpServletResponse resp) {
		List<Constellation> constellations = constellationService.listAll();
		if (!constellations.isEmpty()) {
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
		return constellations;
	}

	@GetMapping("admin/constellations/{id}")
	public Constellation findConstellationsById(@PathVariable("id") int id, HttpServletResponse resp) {
		Constellation constellation = constellationService.selectConstellationsById(id);
		if (constellation != null) {
			resp.setStatus(200);
		} else {
			resp.setStatus(400);
		}
		return constellation;
	}

	@GetMapping("constellations/{id}")
	public Constellation findEnabledConstellationsById(@PathVariable("id") int id, HttpServletResponse resp) {
		Constellation constellation = constellationService.selectEnabledConstellationsById(id);
		if (constellation != null) {
			resp.setStatus(200);
		} else {
			resp.setStatus(400);
		}
		return constellation;
	}

	@PostMapping(path = { "constellations" })
	public Constellation createConstellation(@RequestBody Constellation constellation, HttpServletResponse resp) {
		try {
			constellation = constellationService.create(constellation);

			resp.setStatus(200);
		} catch (Exception e) {
			resp.setStatus(400);
			constellation = null;
			e.printStackTrace();
		}

		return constellation;
	}

	@PutMapping("constellations/{id}")
	public Constellation updateConstellation(@PathVariable("id") int id, @RequestBody Constellation constellation,
			HttpServletResponse resp) {
		try {
			constellation = constellationService.update(id, constellation);
			if (constellation != null)
			{
				resp.setStatus(200);
			}
			else {
				resp.setStatus(400);
			}
		} catch (Exception e) {
			resp.setStatus(400);
			constellation = null;
			e.printStackTrace();
		}
		return constellation;
	}

	@DeleteMapping(path = { "constellations/{id}" })
	public void deletetar(@PathVariable("id") int id, HttpServletResponse resp) {

		try {
			boolean deleted = constellationService.delete(id);
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

	@PutMapping("constellations/{id}/enable")
	public void enableConstellation(@PathVariable("id") int id, HttpServletResponse resp) {
		try {
			boolean enabled = constellationService.enable(id);
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
