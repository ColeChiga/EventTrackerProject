import { ConstellationService } from './constellation.service';
import { Constellation } from './../models/constellation';
import { StarTypeService } from './star-type.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Star } from '../models/star';

@Injectable({
  providedIn: 'root'
})
export class StarService {
  private url = environment.baseUrl + "api/stars";

  constructor(private http: HttpClient, private starTypeService:StarTypeService, private constellationService:ConstellationService) {

   }


  public index() {
    return this.http.get<Star[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('StarService.index(): error retrieving star list: ' + err)
        );
      })
    );
  }

  public show(tid:number) {
    return this.http.get<Star>(this.url+"/"+tid).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('StarService.show(): error retrieving star: ' + err)
        );
      })
    );
  }

  public create(star: Star) {
    return this.http.post<Star>(this.url, star).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('StarService.create(): error creating star: ' + err)
        );
      })
    );
  }

  public update(tid:number, star: Star) {
  console.log(star);
  console.log(star.starType);
  console.log(star.constellation);
  // this.showStarType(sttyp, star);
  // this.showConstellation(constId, star);
    return this.http.put<Star>(this.url+"/"+tid, star).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('StarService.update(): error retrieving star: ' + err)
        );
      })
    );
  }

  public delete(tid: number) {
    return this.http.delete<Star>(this.url+"/"+tid).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('StarService.show(): error retrieving star: ' + err)
        );
      })
    );
  }

/****************************************************** */
//helper method
/****************************************************** */

  showStarType(stid:number, star:Star){
    this.starTypeService.show(stid).subscribe({
      next: (starType) => {
        star.starType = starType;
      },
      error: (problem) => {
        console.error(
          'ConstellationHttpComponent.loadConstellations(): error loading constellations:'
        );
        console.error(problem);
      },
    });
  }
  showConstellation(constId:number, star:Star){
    this.constellationService.show(constId).subscribe({
      next: (constellation) => {
        star.constellation = constellation;
      },
      error: (problem) => {
        console.error(
          'ConstellationHttpComponent.loadConstellations(): error loading constellations:'
        );
        console.error(problem);
      },
    });
  }






  }
