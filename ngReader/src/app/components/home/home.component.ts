import { Constellation } from './../../models/constellation';
import { StarType } from './../../models/star-type';
import { StarTypeService } from './../../services/star-type.service';
import { CommonModule } from '@angular/common';
import { Star } from '../../models/star';
import { StarService } from './../../services/star.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConstellationService } from '../../services/constellation.service';
import { timeout } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  stars: Star[] = [];
  selected: Star | null = null;
  newStar: Star | null = null;
  editStar: any = null;
  starTypes: StarType[] = [];
  strTyp: StarType = new StarType();
  constellations: Constellation[] = [];
  cnst: Constellation = new Constellation();
  constId: number = 0;

  constructor(
    private starService: StarService,
    private starTypeService: StarTypeService,
    private constellationService: ConstellationService,
    private activatedRoute: ActivatedRoute,
    private router:Router
    ) {}

  ngOnInit() {
    this.loadStars();

    this.activatedRoute.paramMap.subscribe({
      next: (params)=>{
        let starIdStr = params.get("starId")
        if(starIdStr){
          let starId = parseInt(starIdStr);
          if(isNaN(starId)){
            this.router.navigateByUrl("invalidTodoId");
          }
          else{
            this.showStar(starId);
          }
        }
      }
    });
  }

  //******************************************* */
  // CRUD operations for Star
  //******************************************* */
  showStar(starId: any) {
    this.starService.show(starId).subscribe({
      next: (result) => {
        this.loadStars();
        this.selected=result;
      },
      error: (nojoy) => {
        console.error('StarsListHttpComponent.showStar(): error showing Star:');
        console.error(nojoy);
      },
    });  }

  loadStars() {
    this.stars = [];
    this.starService.index().subscribe({
      next: (stars) => {
        this.stars = stars;
      },
      error: (problem) => {
        console.error(
          'StarListHttpComponent.loadStars(): error loading Stars:'
        );
        console.error(problem);
      },
    });
  }

  startCreate() {
    this.newStar = new Star();
    this.loadStarTypes();
    this.loadConstellations();
  }

  finishCreate(star: Star) {
    console.log(star);
    star.enabled = true;
    star.starType = this.strTyp;
    star.constellation = this.cnst;

    this.starService.create(star).subscribe({
      next: (result) => {
        this.loadStars();
        // this.constellation=new Constellation();
        // this.starType=new StarType();
        this.newStar = null;
        this.strTyp = new StarType();
        this.cnst = new Constellation();
      },
      error: (nojoy) => {
        console.error('starHttpComponent.finishCreate(): error creating star:');
        console.error(nojoy);
      },
    });
  }

  startEdit() {
    this.editStar = { ...this.selected };
    this.loadStarTypes();
    this.loadConstellations();
    if (this.editStar.constellation) {
      this.cnst = this.editStar.constellation;
    }
    console.log(this.constellations);
    console.log(this.starTypes);
  }

  finishEdit(sId: number, star: Star) {
    // console.log(this.constellation.name);
    console.log(star.constellation);
    console.log(star.starType);
    star.constellation = this.cnst;
    star.starType = this.strTyp;

    this.starService.update(sId, star).subscribe({
      next: (result) => {
        this.loadStars();
        // this.constellation=new Constellation();
        // this.starType=new StarType();
        this.selected = result;
        this.editStar = null;
        this.strTyp = new StarType();
        this.cnst = new Constellation();
      },
      error: (nojoy) => {
        console.error('starHttpComponent.finishEdit(): error updating star:');
        console.error(nojoy);
      },
    });
  }

  deleteStar(sId: number) {
    if(confirm("Are you sure you want to delete this star"))
    this.starService.delete(sId).subscribe({
      next: (result) => {
        this.loadStars();
      },
      error: (nojoy) => {
        console.error('starHttpComponent.deleteStar(): error deleting star:');
        console.error(nojoy);
      },
    });
  }

  //******************************************* */
  //CRUD operations for Star Types
  //******************************************* */

  loadStarTypes() {
    this.starTypeService.index().subscribe({
      next: (starType) => {
        this.starTypes = starType;
      },
      error: (problem) => {
        console.error(
          'StarTypeHttpComponent.loadStarTypes(): error loading starTypes:'
        );
        console.error(problem);
      },
    });
  }

  // showStarType(stid:number){
  //   this.starTypeService.show(stid).subscribe({
  //     next: (starType) => {
  //       this.starType = starType;
  //     },
  //     error: (problem) => {
  //       console.error(
  //         'ConstellationHttpComponent.loadConstellations(): error loading constellations:'
  //       );
  //       console.error(problem);
  //     },
  //   });
  // }

  //******************************************* */
  //CRUD operations for Constellations
  //******************************************* */

  loadConstellations() {
    this.constellationService.index().subscribe({
      next: (constellation) => {
        this.constellations = constellation;
      },
      error: (problem) => {
        console.error(
          'ConstellationHttpComponent.loadConstellations(): error loading constellations:'
        );
        console.error(problem);
      },
    });
  }

  // showConstellation(cid:number){
  //   this.constellationService.show(cid).subscribe({
  //     next: (constellation) => {
  //       this.constellation = constellation;
  //     },
  //     error: (problem) => {
  //       console.error(
  //         'ConstellationHttpComponent.loadConstellations(): error loading constellations:'
  //       );
  //       console.error(problem);
  //     },
  //   });
  // }
}

// //
//     // star.constellation=this.cnst;
//     // star.starType=this.strTyp;

//     console.log(star);

//     if(star.starType){
//       this.starTypeService.show(star.starType.id).subscribe({
//         next: (result)=>{
//           star.starType=result;
//           console.log(star.starType);
//         },
//         error:(problem) => {
//           star.starType=null;
//           console.error('starHttpComponent.finishEdit(): error creating star:');
//           console.error(problem);
//         }
//       });

//     }
//     if(star.constellation){
//       this.constellationService.show(star.constellation.id).subscribe({
//         next: (result)=>{
//           star.constellation=result;
//           console.log(star.constellation);
//         },
//         error:(problem) => {
//           star.constellation=null;
//           console.error('starHttpComponent.finishEdit(): error creating star:');
//           console.error(problem);
//         }
//       });
//     }
//       // if(star.constellation && star.constellation.id > 0){
//         //   this.cnst.id=star.constellation.id
//         // }
//         // if(star.starType && star.starType.id > 0){
//     //   this.strTyp.id=star.starType.id
//     // }
//     // this.showStarType(this.sttyp);
//     // this.showConstellation(this.constId);
