import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PlanetService } from './planet.service';
import { Satellite } from '../models/satellite';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SatelliteService {
  private url = environment.baseUrl + "api/satelllites";

  constructor(private http: HttpClient, private planetService:PlanetService) {

  }


 public index() {
   return this.http.get<Satellite[]>(this.url).pipe(
     catchError((err: any) => {
       console.log(err);
       return throwError(
         () => new Error('SatelliteService.index(): error retrieving satellite list: ' + err)
       );
     })
   );
 }

 public show(tid:number) {
   return this.http.get<Satellite>(this.url+"/"+tid).pipe(
     catchError((err: any) => {
       console.log(err);
       return throwError(
         () => new Error('SatelliteService.show(): error retrieving satellite: ' + err)
       );
     })
   );
 }

 public create(satellite: Satellite) {
   return this.http.post<Satellite>(this.url, satellite).pipe(
     catchError((err: any) => {
       console.log(err);
       return throwError(
         () => new Error('SatelliteService.create(): error creating satellite: ' + err)
       );
     })
   );
 }

 public update(tid:number, satellite: Satellite) {
 console.log(satellite);
 console.log(satellite.planet);
 // this.showSatelliteType(sttyp, satellite);
 // this.showConstellation(constId, satellite);
   return this.http.put<Satellite>(this.url+"/"+tid, satellite).pipe(
     catchError((err: any) => {
       console.log(err);
       return throwError(
         () => new Error('SatelliteService.update(): error retrieving satellite: ' + err)
       );
     })
   );
 }

 public delete(tid: number) {
   return this.http.delete<Satellite>(this.url+"/"+tid).pipe(
     catchError((err: any) => {
       console.log(err);
       return throwError(
         () => new Error('SatelliteService.show(): error retrieving satellite: ' + err)
       );
     })
   );
 }

/****************************************************** */
//helper method
/****************************************************** */

 showPlanetType(stid:number, satellite:Satellite){
   this.planetService.show(stid).subscribe({
     next: (planet) => {
       satellite.planet = planet;
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
