import { Satellite } from './../../models/satellite';
import { CommonModule } from '@angular/common';
import { Planet } from '../../models/planet';
import { PlanetService } from './../../services/planet.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SatelliteService } from '../../services/satellite.service';

@Component({
  selector: 'app-satellites',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './satellites.component.html',
  styleUrl: './satellites.component.css'
})
export class SatellitesComponent {

        satellites: Satellite[] = [];
        selected: Satellite | null = null;
        newSatellite: Satellite | null = null;
        editSatellite: any = null;
        planets: Planet[] = [];
        plnt: Planet = new Planet();

        constructor(
          private planetService: PlanetService,
          private satelliteService: SatelliteService,
          private activatedRoute: ActivatedRoute,
          private router:Router
          ) {}

        ngOnInit() {
          this.loadSatellites();

          this.activatedRoute.paramMap.subscribe({
            next: (params)=>{
              let satelliteIdStr = params.get("satelliteId")
              if(satelliteIdStr){
                let satelliteId = parseInt(satelliteIdStr);
                if(isNaN(satelliteId)){
                  this.router.navigateByUrl("invalidTodoId");
                }
                else{
                  this.showSatellite(satelliteId);
                }
              }
            }
          });
        }

        //******************************************* */
        // CRUD operations for Satellite
        //******************************************* */
        showSatellite(satelliteId: any) {
          this.satelliteService.show(satelliteId).subscribe({
            next: (result) => {
              this.loadSatellites();
              this.selected=result;
            },
            error: (nojoy) => {
              console.error('SatellitesListHttpComponent.showSatellite(): error showing Satellite:');
              console.error(nojoy);
            },
          });  }

        loadSatellites() {
          this.satellites = [];
          this.satelliteService.index().subscribe({
            next: (satellites) => {
              this.satellites = satellites;
            },
            error: (problem) => {
              console.error(
                'SatelliteListHttpComponent.loadSatellites(): error loading Satellites:'
              );
              console.error(problem);
            },
          });
        }

        satellitetCreate() {
          this.newSatellite = new Satellite();
          this.loadPlanet();
        }

        finishCreate(satellite: Satellite) {
          console.log(satellite);
          satellite.enabled = true;
          satellite.planet = this.plnt;

          this.satelliteService.create(satellite).subscribe({
            next: (result) => {
              this.loadSatellites();
              // this.satellite=new Satellite();
              // this.satellite=new SatelliteType();
              this.newSatellite = null;
              this.plnt = new Planet();
            },
            error: (nojoy) => {
              console.error('satelliteHttpComponent.finishCreate(): error creating satellite:');
              console.error(nojoy);
            },
          });
        }

        satelliteEdit() {
          this.editSatellite = { ...this.selected };
          this.loadPlanet();
          if (this.editSatellite.planet) {
            this.plnt = this.editSatellite.planet;
          }
        }

        finishEdit(sId: number, satellite: Satellite) {
          // console.log(this.satellite.name);

          this.satelliteService.update(sId, satellite).subscribe({
            next: (result) => {
              this.loadSatellites();
              // this.satellite=new Satellite();
              // this.satelliteType=new SatelliteType();
              this.selected = result;
              this.editSatellite = null;
              this.plnt = new Planet();
            },
            error: (nojoy) => {
              console.error('satelliteHttpComponent.finishEdit(): error updating satellite:');
              console.error(nojoy);
            },
          });
        }

        deleteSatellite(sId: number) {
          if(confirm("Are you sure you want to delete this Planet Type"))
          this.satelliteService.delete(sId).subscribe({
            next: (result) => {
              this.loadSatellites();
            },
            error: (nojoy) => {
              console.error('satelliteHttpComponent.deleteSatellite(): error deleting satellite:');
              console.error(nojoy);
            },
          });
        }

        //******************************************* */
        //CRUD operations for Planet
        //******************************************* */

        loadPlanet() {
          this.planetService.index().subscribe({
            next: (planets) => {
              this.planets = planets;
            },
            error: (problem) => {
              console.error(
                'PlanetHttpComponent.loadPlanet(): error loading planet:'
              );
              console.error(problem);
            },
          });
        }


      }


