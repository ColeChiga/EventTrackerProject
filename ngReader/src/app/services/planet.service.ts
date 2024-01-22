import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StarService } from './star.service';
import { Planet } from '../models/planet';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private url = environment.baseUrl + "api/planets";

  constructor(private http: HttpClient, private starService:StarService) {

   }


  public index() {
    return this.http.get<Planet[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('PlanetService.index(): error retrieving planet list: ' + err)
        );
      })
    );
  }

  public show(tid:number) {
    return this.http.get<Planet>(this.url+"/"+tid).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('PlanetService.show(): error retrieving planet: ' + err)
        );
      })
    );
  }

  public create(planet: Planet) {
    return this.http.post<Planet>(this.url, planet).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('PlanetService.create(): error creating planet: ' + err)
        );
      })
    );
  }

  public update(tid:number, planet: Planet) {
  console.log(planet);
  console.log(planet.star);
  // this.showPlanetType(sttyp, planet);
  // this.showConstellation(constId, planet);
    return this.http.put<Planet>(this.url+"/"+tid, planet).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('PlanetService.update(): error retrieving planet: ' + err)
        );
      })
    );
  }

  public delete(tid: number) {
    return this.http.delete<Planet>(this.url+"/"+tid).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('PlanetService.show(): error retrieving planet: ' + err)
        );
      })
    );
  }

/****************************************************** */
//helper method
/****************************************************** */

  showStarType(stid:number, planet:Planet){
    this.starService.show(stid).subscribe({
      next: (star) => {
        planet.star = star;
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
