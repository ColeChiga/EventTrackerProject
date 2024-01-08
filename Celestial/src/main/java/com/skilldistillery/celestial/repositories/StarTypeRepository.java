package com.skilldistillery.celestial.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.celestial.entities.StarType;

public interface StarTypeRepository extends JpaRepository<StarType, Integer>{
	List<StarType> searchByEnabled(boolean enabled);

	StarType searchByIdAndEnabled(int id, boolean b);
}
