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
public class Star {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String about;
	@Column(name = "image_url")
	private String imageUrl;
	private Boolean enabled;
	@Column(name = "right_ascension")
	private String ascension;
	private String declination;
	@Column(name = "age_billion_years")
	private String age;
	@Column(name = "lifetime_billion_years")
	private String lifetime;
	@Column(name = "create_date")
	@CreationTimestamp
	private LocalDateTime createDate;
	@Column(name = "last_update")
	@UpdateTimestamp
	private LocalDateTime lastUpdate;
	
	@ManyToOne
	@JoinColumn(name = "constellation_id")
	private Constellation constellation;

	@ManyToOne
	@JoinColumn(name = "star_type_id")
	private StarType starType;

	@OneToMany(mappedBy = ("star"))
	@JsonIgnore
	private List<Planet> planets;
	
	@Column(name = "solar_masses")
	private Double solarMasses;
	
	private Double luminosity;
	
	@Column(name = "radius_km")
	private Double radius;


	public Double getSolarMasses() {
		return solarMasses;
	}
	public void setSolarMasses(Double solarMasses) {
		this.solarMasses = solarMasses;
	}
	public Double getLuminosity() {
		return luminosity;
	}
	public void setLuminosity(Double luminosity) {
		this.luminosity = luminosity;
	}
	public Double getRadius() {
		return radius;
	}
	public void setRadius(Double radius) {
		this.radius = radius;
	}
	public Star() {
	}
	public List<Planet> getPlanets() {
		return planets;
	}
	
	public void setPlanets(List<Planet> planets) {
		this.planets = planets;
	}

	public void addStar(Planet planet) {
		if (planets == null) {
			planets = new ArrayList<>();
		}
		if (!planets.contains(planet)) {
			planets.add(planet);
			planet.setStar(this);
		}
	}

	public void removeStar(Planet planet) {
		if (planets != null && planets.contains(planet)) {
			planets.remove(planet);
			planet.setStar(null);
		}
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

	public String getAscension() {
		return ascension;
	}

	public void setAscension(String ascension) {
		this.ascension = ascension;
	}

	public String getDeclination() {
		return declination;
	}

	public void setDeclination(String declination) {
		this.declination = declination;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getLifetime() {
		return lifetime;
	}

	public void setLifetime(String lifetime) {
		this.lifetime = lifetime;
	}

	public StarType getStarType() {
		return starType;
	}
	
	public void setStarType(StarType starType) {
		this.starType = starType;
	}
	public Constellation getConstellation() {
		return constellation;
	}

	public void setConstellation(Constellation constellation) {
		this.constellation = constellation;
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
		Star other = (Star) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Star [id=" + id + ", name=" + name + ", about=" + about + ", imageUrl=" + imageUrl + ", enabled="
				+ enabled + ", ascension=" + ascension + ", declination=" + declination + ", age=" + age + ", lifetime="
				+ lifetime + ", createDate=" + createDate + ", lastUpdate=" + lastUpdate + ", solarMasses="
				+ solarMasses + ", luminosity=" + luminosity + ", radius=" + radius + "]";
	}

}
