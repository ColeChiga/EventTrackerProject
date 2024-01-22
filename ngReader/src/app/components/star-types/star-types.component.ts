import { Constellation } from './../../models/constellation';
import { StarType } from './../../models/star-type';
import { StarTypeService } from './../../services/star-type.service';
import { CommonModule } from '@angular/common';
import { Star } from '../../models/star';
import { StarService } from './../../services/star.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-star-types',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './star-types.component.html',
  styleUrl: './star-types.component.css'
})
export class StarTypesComponent {

    starTypes: StarType[] = [];
    selected: StarType | null = null;
    newStarType: StarType | null = null;
    editStarType: any = null;
    stars: Star[] = [];
    // str: Star = new Star();

    constructor(
      private starService: StarService,
      private starTypeService: StarTypeService,
      private activatedRoute: ActivatedRoute,
      private router:Router
      ) {}

    ngOnInit() {
      this.loadStarTypes();

      this.activatedRoute.paramMap.subscribe({
        next: (params)=>{
          let starTypeIdStr = params.get("starTypeId")
          if(starTypeIdStr){
            let starTypeId = parseInt(starTypeIdStr);
            if(isNaN(starTypeId)){
              this.router.navigateByUrl("invalidTodoId");
            }
            else{
              this.showStarType(starTypeId);
            }
          }
        }
      });
    }

    //******************************************* */
    // CRUD operations for StarType
    //******************************************* */
    showStarType(starTypeId: any) {
      this.starTypeService.show(starTypeId).subscribe({
        next: (result) => {
          this.loadStarTypes();
          this.selected=result;
        },
        error: (nojoy) => {
          console.error('StarTypesListHttpComponent.showStarType(): error showing StarType:');
          console.error(nojoy);
        },
      });  }

    loadStarTypes() {
      this.starTypes = [];
      this.starTypeService.index().subscribe({
        next: (starTypes) => {
          this.starTypes = starTypes;
        },
        error: (problem) => {
          console.error(
            'StarTypeListHttpComponent.loadStarTypes(): error loading StarTypes:'
          );
          console.error(problem);
        },
      });
    }

    starTypetCreate() {
      this.newStarType = new StarType();
      this.loadStar();
    }

    finishCreate(starType: StarType) {
      console.log(starType);
      starType.enabled = true;
      // starType.star = this.str;

      this.starTypeService.create(starType).subscribe({
        next: (result) => {
          this.loadStarTypes();
          // this.constellation=new Constellation();
          // this.starType=new StarTypeType();
          this.newStarType = null;
          // this.str = new Star();
        },
        error: (nojoy) => {
          console.error('starTypeHttpComponent.finishCreate(): error creating starType:');
          console.error(nojoy);
        },
      });
    }

    starTypeEdit() {
      this.editStarType = { ...this.selected };
      this.loadStar();
      if (this.editStarType.star) {
        // this.str = this.editStarType.star;
      }
    }

    finishEdit(sId: number, starType: StarType) {
      // console.log(this.constellation.name);

      this.starTypeService.update(sId, starType).subscribe({
        next: (result) => {
          this.loadStarTypes();
          // this.constellation=new Constellation();
          // this.starTypeType=new StarTypeType();
          this.selected = result;
          this.editStarType = null;
          // this.str = new Star();
        },
        error: (nojoy) => {
          console.error('starTypeHttpComponent.finishEdit(): error updating starType:');
          console.error(nojoy);
        },
      });
    }

    deleteStarType(sId: number) {
      if(confirm("Are you sure you want to delete this Star Type"))
      this.starTypeService.delete(sId).subscribe({
        next: (result) => {
          this.loadStarTypes();
        },
        error: (nojoy) => {
          console.error('starTypeHttpComponent.deleteStarType(): error deleting starType:');
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


