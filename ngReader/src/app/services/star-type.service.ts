import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { StarType } from '../models/star-type';

@Injectable({
  providedIn: 'root'
})
export class StarTypeService {

  private url = environment.baseUrl + "api/starTypes";


  constructor(private http: HttpClient) {

  }


 public index() {
   return this.http.get<StarType[]>(this.url).pipe(
     catchError((err: any) => {
       console.log(err);
       return throwError(
         () => new Error('StarTypeService.index(): error retrieving starType list: ' + err)
       );
     })
   );
 }

 public show(tid:number) {
   return this.http.get<StarType>(this.url+"/"+tid).pipe(
     catchError((err: any) => {
       console.log(err);
       return throwError(
         () => new Error('StarTypeService.show(): error retrieving starType: ' + err)
       );
     })
   );
 }

 public create(starType: StarType) {
   return this.http.post<StarType>(this.url, starType).pipe(
     catchError((err: any) => {
       console.log(err);
       return throwError(
         () => new Error('StarTypeService.create(): error creating starType: ' + err)
       );
     })
   );
 }

 public update(tid:number, starType: StarType) {
 // this.showStarTypeType(sttyp, starType);
 // this.showConstellation(constId, starType);
   return this.http.put<StarType>(this.url+"/"+tid, starType).pipe(
     catchError((err: any) => {
       console.log(err);
       return throwError(
         () => new Error('StarTypeService.update(): error retrieving starType: ' + err)
       );
     })
   );
 }

 public delete(tid: number) {
   return this.http.delete<StarType>(this.url+"/"+tid).pipe(
     catchError((err: any) => {
       console.log(err);
       return throwError(
         () => new Error('StarTypeService.show(): error retrieving starType: ' + err)
       );
     })
   );
 }

/****************************************************** */
//helper method
/****************************************************** */

//  showStarType(stid:number, starType:StarType){
//    this.starService.show(stid).subscribe({
//      next: (star) => {
//        starType.stars = star;
//      },
//      error: (problem) => {
//        console.error(
//          'ConstellationHttpComponent.loadConstellations(): error loading constellations:'
//        );
//        console.error(problem);
//      },
//    });
//  }


}
