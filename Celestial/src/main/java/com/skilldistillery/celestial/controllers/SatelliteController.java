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
import com.skilldistillery.celestial.services.SatelliteService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
public class SatelliteController {

	@Autowired
	private SatelliteService satelliteService;
	@GetMapping(path = { "satellites", "satellites/" })
	public List<Satellite> findAllEnabledSatellites(HttpServletResponse resp) {
		List<Satellite> satellites = satelliteService.listAllEnabled();
		if (!satellites.isEmpty()) {
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
		return satellites;
	}

	@GetMapping("admin/satellites")
	public List<Satellite> findAllSatellites(HttpServletResponse resp) {
		List<Satellite> satellites = satelliteService.listAll();
		if (!satellites.isEmpty()) {
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
		return satellites;
	}

	@GetMapping("admin/satellites/{id}")
	public Satellite findSatellitesById(@PathVariable("id") int id, HttpServletResponse resp) {
		Satellite satellite = satelliteService.findById(id);
		if (satellite != null) {
			resp.setStatus(200);
		} else {
			resp.setStatus(400);
		}
		return satellite;
	}

	@GetMapping("satellites/{id}")
	public Satellite findEnabledSatellitesById(@PathVariable("id") int id, HttpServletResponse resp) {
		Satellite satellite = satelliteService.selectEnabledSatellitesById(id);
		if (satellite != null) {
			resp.setStatus(200);
		} else {
			resp.setStatus(400);
		}
		return satellite;
	}

	@PostMapping(path = { "satellites" })
	public Satellite createSatellite(@RequestBody Satellite satellite, HttpServletResponse resp) {
		try {
			satellite = satelliteService.create(satellite);

			resp.setStatus(200);
		} catch (Exception e) {
			resp.setStatus(400);
			satellite = null;
			e.printStackTrace();
		}

		return satellite;
	}

	@PutMapping("satellites/{id}")
	public Satellite updateSatellite(@PathVariable("id") int id, @RequestBody Satellite satellite,
			HttpServletResponse resp) {
		try {
			satellite = satelliteService.update(id, satellite);
			if (satellite != null)
			{
				resp.setStatus(200);
			}
			else {
				resp.setStatus(400);
			}
		} catch (Exception e) {
			resp.setStatus(400);
			satellite = null;
			e.printStackTrace();
		}
		return satellite;
	}

	@DeleteMapping(path = { "satellites/{id}" })
	public void deletetar(@PathVariable("id") int id, HttpServletResponse resp) {

		try {
			boolean deleted = satelliteService.delete(id);
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

	@PutMapping("satellites/{id}/enable")
	public void enableSatellite(@PathVariable("id") int id, HttpServletResponse resp) {
		try {
			boolean enabled = satelliteService.enable(id);
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
