package com.skilldistillery.celestial.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Satellite {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String about;
	@Column(name = "image_url")
	private String imageUrl;	
	@Column(name = "natural_object")
	private Boolean natural;
	private Boolean enabled;
	@Column(name = "orbital_radius_km")
	private Integer orbitRadius;
	@Column(name = "orbital_circumference_km")
	private Integer orbitCircumferance;
	@Column(name = "create_date")
	@CreationTimestamp
	private LocalDateTime createDate;
	@Column(name = "last_update")
	@UpdateTimestamp
	private LocalDateTime lastUpdate;
	
	
	@ManyToOne
	@JoinColumn(name = "planet_id")
	private Planet planet;

	public Satellite() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imgUrl) {
		this.imageUrl = imgUrl;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public LocalDateTime getCreateDate() {
		return createDate;
	}

	public void setCreateDate(LocalDateTime createDate) {
		this.createDate = createDate;
	}

	public LocalDateTime getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(LocalDateTime lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	public Integer getOrbitRadius() {
		return orbitRadius;
	}

	public void setOrbitRadius(Integer orbitRadius) {
		this.orbitRadius = orbitRadius;
	}

	public Integer getOrbitCircumferance() {
		return orbitCircumferance;
	}

	public void setOrbitCircumferance(Integer orbitCircumference) {
		this.orbitCircumferance = orbitCircumference;
	}

	public Planet getStar() {
		return planet;
	}
	
	public void setStar(Planet planet) {
		this.planet = planet;
	}
	

	public Boolean getNatural() {
		return natural;
	}

	public void setNatural(Boolean natural) {
		this.natural = natural;
	}

	public Planet getPlanet() {
		return planet;
	}

	public void setPlanet(Planet planet) {
		this.planet = planet;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Satellite other = (Satellite) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Star [id=" + id + ", name=" + name + ", about=" + about + ", imageUrl=" + imageUrl + ", enabled="
				+ enabled + ", orbitRadius=" + orbitRadius + ", orbitCircumferance="
				+ orbitCircumferance + ", createDate=" + createDate + ", lastUpdate=" + lastUpdate + "]";
	}

}
