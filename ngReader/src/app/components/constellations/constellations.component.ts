import { Constellation } from './../../models/constellation';
import { CommonModule } from '@angular/common';
import { Star } from '../../models/star';
import { StarService } from './../../services/star.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstellationService } from '../../services/constellation.service';

@Component({
  selector: 'app-constellations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './constellations.component.html',
  styleUrl: './constellations.component.css'
})

export class ConstellationsComponent {

      constellations: Constellation[] = [];
      selected: Constellation | null = null;
      newConstellation: Constellation | null = null;
      editConstellation: any = null;
      stars: Star[] = [];
      // str: Star = new Star();

      constructor(
        private starService: StarService,
        private constellationService: ConstellationService,
        private activatedRoute: ActivatedRoute,
        private router:Router
        ) {}

      ngOnInit() {
        this.loadConstellations();

        this.activatedRoute.paramMap.subscribe({
          next: (params)=>{
            let constellationIdStr = params.get("constellationId")
            if(constellationIdStr){
              let constellationId = parseInt(constellationIdStr);
              if(isNaN(constellationId)){
                this.router.navigateByUrl("invalidTodoId");
              }
              else{
                this.showConstellation(constellationId);
              }
            }
          }
        });
      }

      //******************************************* */
      // CRUD operations for Constellation
      //******************************************* */
      showConstellation(constellationId: any) {
        this.constellationService.show(constellationId).subscribe({
          next: (result) => {
            this.loadConstellations();
            this.selected=result;
          },
          error: (nojoy) => {
            console.error('ConstellationsListHttpComponent.showConstellation(): error showing Constellation:');
            console.error(nojoy);
          },
        });  }

      loadConstellations() {
        this.constellations = [];
        this.constellationService.index().subscribe({
          next: (constellations) => {
            this.constellations = constellations;
          },
          error: (problem) => {
            console.error(
              'ConstellationListHttpComponent.loadConstellations(): error loading Constellations:'
            );
            console.error(problem);
          },
        });
      }

      constellationtCreate() {
        this.newConstellation = new Constellation();
        this.loadStar();
      }

      finishCreate(constellation: Constellation) {
        console.log(constellation);
        constellation.enabled = true;
        // constellation.star = this.str;

        this.constellationService.create(constellation).subscribe({
          next: (result) => {
            this.loadConstellations();
            // this.constellation=new Constellation();
            // this.constellation=new ConstellationType();
            this.newConstellation = null;
            // this.str = new Star();
          },
          error: (nojoy) => {
            console.error('constellationHttpComponent.finishCreate(): error creating constellation:');
            console.error(nojoy);
          },
        });
      }

      constellationEdit() {
        this.editConstellation = { ...this.selected };
        this.loadStar();
        if (this.editConstellation.star) {
          // this.str = this.editConstellation.star;
        }
      }

      finishEdit(sId: number, constellation: Constellation) {
        // console.log(this.constellation.name);

        this.constellationService.update(sId, constellation).subscribe({
          next: (result) => {
            this.loadConstellations();
            // this.constellation=new Constellation();
            // this.constellationType=new ConstellationType();
            this.selected = result;
            this.editConstellation = null;
            // this.str = new Star();
          },
          error: (nojoy) => {
            console.error('constellationHttpComponent.finishEdit(): error updating constellation:');
            console.error(nojoy);
          },
        });
      }

      deleteConstellation(sId: number) {
        if(confirm("Are you sure you want to delete this Star Type"))
        this.constellationService.delete(sId).subscribe({
          next: (result) => {
            this.loadConstellations();
          },
          error: (nojoy) => {
            console.error('constellationHttpComponent.deleteConstellation(): error deleting constellation:');
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


