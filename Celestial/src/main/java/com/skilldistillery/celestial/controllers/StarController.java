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
import com.skilldistillery.celestial.entities.Star;
import com.skilldistillery.celestial.services.StarService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
public class StarController {

	@Autowired
	private StarService starService;
	@GetMapping(path = { "stars", "stars/" })
	public List<Star> findAllEnabledStars(HttpServletResponse resp) {
		List<Star> stars = starService.listAllEnabled();
		if (!stars.isEmpty()) {
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
		return stars;
	}
	
	@GetMapping("starTypes/{id}/stars")
	public List<Star> findAllStarsForStarsTypes(@PathVariable("id") int id, HttpServletResponse resp) {
		List<Star> stars = starService.listAllStarsForStarType(id);
		if (!stars.isEmpty()) {
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
		return stars;
	}
	@GetMapping("constellations/{id}/stars")
	public List<Star> findAllStarsForConstellations(@PathVariable("id") int id, HttpServletResponse resp) {
		List<Star> stars = starService.listAllStarsForConstellation(id);
		if (!stars.isEmpty()) {
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
		return stars;
	}
	
	@GetMapping("admin/stars")
	public List<Star> findAllStars(HttpServletResponse resp) {
		List<Star> stars = starService.listAll();
		if (!stars.isEmpty()) {
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
		return stars;
	}

	@GetMapping("admin/stars/{id}")
	public Star findStarsById(@PathVariable("id") int id, HttpServletResponse resp) {
		Star star = starService.findById(id);
		if (star != null) {
			resp.setStatus(200);
		} else {
			resp.setStatus(400);
		}
		return star;
	}

	@GetMapping("stars/{id}")
	public Star findEnabledStarsById(@PathVariable("id") int id, HttpServletResponse resp) {
		Star star = starService.selectEnabledStarsById(id);
		if (star != null) {
			resp.setStatus(200);
		} else {
			resp.setStatus(400);
		}
		return star;
	}

	@PostMapping(path = { "stars" })
	public Star createStar(@RequestBody Star star, HttpServletResponse resp) {
		try {
			star = starService.create(star);
			System.out.println(star);
			resp.setStatus(200);
		} catch (Exception e) {
			resp.setStatus(400);
			star = null;
			e.printStackTrace();
		}

		return star;
	}

	@PutMapping("stars/{id}")
	public Star updateStar(@PathVariable("id") int id, @RequestBody Star star,
			HttpServletResponse resp) {
		try {
			star = starService.update(id, star);
			if (star != null)
			{
				resp.setStatus(200);
			}
			else {
				resp.setStatus(400);
			}
		} catch (Exception e) {
			resp.setStatus(400);
			star = null;
			e.printStackTrace();
		}
		return star;
	}

	@DeleteMapping(path = { "stars/{id}" })
	public void deletetar(@PathVariable("id") int id, HttpServletResponse resp) {

		try {
			boolean deleted = starService.delete(id);
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

	@PutMapping("stars/{id}/enable")
	public void enableStar(@PathVariable("id") int id, HttpServletResponse resp) {
		try {
			boolean enabled = starService.enable(id);
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
