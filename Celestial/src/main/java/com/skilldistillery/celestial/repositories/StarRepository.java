package com.skilldistillery.celestial.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.celestial.entities.Star;

public interface StarRepository extends JpaRepository<Star, Integer>{
	List<Star> searchByEnabled(boolean enabled);
}
