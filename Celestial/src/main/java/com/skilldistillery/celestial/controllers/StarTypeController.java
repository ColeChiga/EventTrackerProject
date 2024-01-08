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
import com.skilldistillery.celestial.services.StarTypeService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
public class StarTypeController {

	@Autowired
	private StarTypeService starTypeService;
	@GetMapping(path = { "starTypes", "starTypes/" })
	public List<StarType> findAllEnabledStarTypes(HttpServletResponse resp) {
		List<StarType> starTypes = starTypeService.listAllEnabled();
		if (!starTypes.isEmpty()) {
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
		return starTypes;
	}

	@GetMapping("admin/starTypes")
	public List<StarType> findAllStarTypes(HttpServletResponse resp) {
		List<StarType> starTypes = starTypeService.listAll();
		if (!starTypes.isEmpty()) {
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
		return starTypes;
	}

	@GetMapping("admin/starTypes/{id}")
	public StarType findStarTypesById(@PathVariable("id") int id, HttpServletResponse resp) {
		StarType starType = starTypeService.findById(id);
		if (starType != null) {
			resp.setStatus(200);
		} else {
			resp.setStatus(400);
		}
		return starType;
	}

	@GetMapping("starTypes/{id}")
	public StarType findEnabledStarTypesById(@PathVariable("id") int id, HttpServletResponse resp) {
		StarType starType = starTypeService.selectEnabledStarTypesById(id);
		if (starType != null) {
			resp.setStatus(200);
		} else {
			resp.setStatus(400);
		}
		return starType;
	}

	@PostMapping(path = { "starTypes" })
	public StarType createStarType(@RequestBody StarType starType, HttpServletResponse resp) {
		try {
			starType = starTypeService.create(starType);

			resp.setStatus(200);
		} catch (Exception e) {
			resp.setStatus(400);
			starType = null;
			e.printStackTrace();
		}

		return starType;
	}

	@PutMapping("starTypes/{id}")
	public StarType updateStarType(@PathVariable("id") int id, @RequestBody StarType starType,
			HttpServletResponse resp) {
		try {
			starType = starTypeService.update(id, starType);
			if (starType != null)
			{
				resp.setStatus(200);
			}
			else {
				resp.setStatus(400);
			}
		} catch (Exception e) {
			resp.setStatus(400);
			starType = null;
			e.printStackTrace();
		}
		return starType;
	}

	@DeleteMapping(path = { "starTypes/{id}" })
	public void deletetar(@PathVariable("id") int id, HttpServletResponse resp) {

		try {
			boolean deleted = starTypeService.delete(id);
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

	@PutMapping("starTypes/{id}/enable")
	public void enableStarType(@PathVariable("id") int id, HttpServletResponse resp) {
		try {
			boolean enabled = starTypeService.enable(id);
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
