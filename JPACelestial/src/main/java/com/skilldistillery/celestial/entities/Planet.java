package com.skilldistillery.celestial.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Planet {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String about;
	@Column(name = "image_url")
	private String imageUrl;
	private Boolean enabled;
	
	private Double mass;
	public Double getMass() {
		return mass;
	}

	public void setMass(Double mass) {
		this.mass = mass;
	}

	@Column(name = "radius_km")
	private Double radius;
	@Column(name = "orbital_radius_AU")
	private Double orbitRadius;
	@Column(name = "orbital_circumference_AU")
	private Double orbitCircumferance;
	@Column(name = "create_date")
	@CreationTimestamp
	private LocalDateTime createDate;
	@Column(name = "last_update")
	@UpdateTimestamp
	private LocalDateTime lastUpdate;
	
	@ManyToOne
	@JoinColumn(name = "star_id")
	private Star star;
	
	@OneToMany(mappedBy = "planet")
	@JsonIgnore
	private List<Satellite> satellites;

	public Planet() {
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

	public Double getOrbitRadius() {
		return orbitRadius;
	}

	public void setOrbitRadius(Double orbitRadius) {
		this.orbitRadius = orbitRadius;
	}

	public Double getOrbitCircumferance() {
		return orbitCircumferance;
	}

	public void setOrbitCircumferance(Double orbitCircumference) {
		this.orbitCircumferance = orbitCircumference;
	}

	
	public void setRadius(Double radius) {
		this.radius = radius;
	}
	
	public Double getRadius() {
		return radius;
	}
	public Star getStar() {
		return star;
	}
	
	public List<Satellite> getSatellites() {
		return satellites;
	}
	
	public void setSatellites(List<Satellite> satellite) {
		this.satellites = satellite;
	}

	public void setStar(Star star) {
		this.star = star;
	}
	
	public void addSatellite(Satellite satellite) {
		if (satellites == null) {
			satellites = new ArrayList<>(); 
		}
		if (!satellites.contains(satellite)) {
			satellites.add(satellite);
			satellite.setPlanet(this);
		}
	}

	public void removeSatellite(Satellite satellite) {
		if (satellites != null && satellites.contains(satellite)) {
			satellites.remove(satellite);
			satellite.setPlanet(null);
		}
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
		Planet other = (Planet) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Planet [id=" + id + ", name=" + name + ", about=" + about + ", imageUrl=" + imageUrl + ", enabled="
				+ enabled + ", mass=" + mass + ", radius=" + radius + ", orbitRadius=" + orbitRadius
				+ ", orbitCircumferance=" + orbitCircumferance + ", createDate=" + createDate + ", lastUpdate="
				+ lastUpdate + "]";
	}

}
