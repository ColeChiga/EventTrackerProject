package com.skilldistillery.celestial.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.celestial.entities.Constellation;

public interface ConstellationRepository extends JpaRepository<Constellation, Integer>{
	List<Constellation> searchByEnabled(boolean enabled);

	Constellation searchByIdAndEnabled(int id, boolean b);
}
