import { CommonModule } from '@angular/common';
import { Star } from '../../models/star';
import { StarService } from './../../services/star.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Planet } from '../../models/planet';
import { PlanetService } from '../../services/planet.service';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.css'
})
export class PlanetsComponent {

  planets: Planet[] = [];
  selected: Planet | null = null;
  newPlanet: Planet | null = null;
  editPlanet: any = null;
  stars: Star[] = [];
  str: Star = new Star();

  constructor(
    private starService: StarService,
    private planetService: PlanetService,
    private activatedRoute: ActivatedRoute,
    private router:Router
    ) {}

  ngOnInit() {
    this.loadPlanets();

    this.activatedRoute.paramMap.subscribe({
      next: (params)=>{
        let planetIdStr = params.get("planetId")
        if(planetIdStr){
          let planetId = parseInt(planetIdStr);
          if(isNaN(planetId)){
            this.router.navigateByUrl("invalidTodoId");
          }
          else{
            this.showPlanet(planetId);
          }
        }
      }
    });
  }

  //******************************************* */
  // CRUD operations for Planet
  //******************************************* */
  showPlanet(planetId: any) {
    this.planetService.show(planetId).subscribe({
      next: (result) => {
        this.loadPlanets();
        this.selected=result;
      },
      error: (nojoy) => {
        console.error('PlanetsListHttpComponent.showPlanet(): error showing Planet:');
        console.error(nojoy);
      },
    });  }

  loadPlanets() {
    this.planets = [];
    this.planetService.index().subscribe({
      next: (planets) => {
        this.planets = planets;
      },
      error: (problem) => {
        console.error(
          'PlanetListHttpComponent.loadPlanets(): error loading Planets:'
        );
        console.error(problem);
      },
    });
  }

  planettCreate() {
    this.newPlanet = new Planet();
    this.loadStar();
  }

  finishCreate(planet: Planet) {
    console.log(planet);
    planet.enabled = true;
    planet.star = this.str;

    this.planetService.create(planet).subscribe({
      next: (result) => {
        this.loadPlanets();
        // this.constellation=new Constellation();
        // this.starType=new PlanetType();
        this.newPlanet = null;
        this.str = new Star();
      },
      error: (nojoy) => {
        console.error('planetHttpComponent.finishCreate(): error creating planet:');
        console.error(nojoy);
      },
    });
  }

  planetEdit() {
    this.editPlanet = { ...this.selected };
    this.loadStar();
    if (this.editPlanet.star) {
      this.str = this.editPlanet.star;
    }
  }

  finishEdit(sId: number, planet: Planet) {
    // console.log(this.constellation.name);


    planet.star = this.str;

    this.planetService.update(sId, planet).subscribe({
      next: (result) => {
        this.loadPlanets();
        // this.constellation=new Constellation();
        // this.planetType=new PlanetType();
        this.selected = result;
        this.editPlanet = null;
        this.str = new Star();
      },
      error: (nojoy) => {
        console.error('planetHttpComponent.finishEdit(): error updating planet:');
        console.error(nojoy);
      },
    });
  }

  deletePlanet(sId: number) {
    if(confirm("Are you sure you want to delete this planet"))
    this.planetService.delete(sId).subscribe({
      next: (result) => {
        this.loadPlanets();
      },
      error: (nojoy) => {
        console.error('planetHttpComponent.deletePlanet(): error deleting planet:');
        console.error(nojoy);
      },
    });
  }

  //******************************************* */
  //CRUD operations for Star
  //******************************************* */

  loadStar() {
    this.starService.index().subscribe({
      next: (stars) => {
        this.stars = stars;
      },
      error: (problem) => {
        console.error(
          'StarHttpComponent.loadStar(): error loading star:'
        );
        console.error(problem);
      },
    });
  }


}

