import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';
import { Constellation } from '../models/constellation';

@Injectable({
  providedIn: 'root'
})
export class ConstellationService {
  private url = environment.baseUrl + "api/constellations";

  constructor(private http: HttpClient) {

  }

 public index() {
   return this.http.get<Constellation[]>(this.url).pipe(
     catchError((err: any) => {
       console.log(err);
       return throwError(
         () => new Error('ConstellationService.index(): error retrieving constellation list: ' + err)
       );
     })
   );
 }

 public show(tid:number) {
   return this.http.get<Constellation>(this.url+"/"+tid).pipe(
     catchError((err: any) => {
       console.log(err);
       return throwError(
         () => new Error('ConstellationService.show(): error retrieving constellation: ' + err)
       );
     })
   );
 }

 public create(constellation: Constellation) {
   return this.http.post<Constellation>(this.url, constellation).pipe(
     catchError((err: any) => {
       console.log(err);
       return throwError(
         () => new Error('ConstellationService.create(): error creating constellation: ' + err)
       );
     })
   );
 }

 public update(tid:number, constellation: Constellation) {
 // this.showConstellationType(sttyp, constellation);
 // this.showConstellation(constId, constellation);
   return this.http.put<Constellation>(this.url+"/"+tid, constellation).pipe(
     catchError((err: any) => {
       console.log(err);
       return throwError(
         () => new Error('ConstellationService.update(): error retrieving constellation: ' + err)
       );
     })
   );
 }

 public delete(tid: number) {
   return this.http.delete<Constellation>(this.url+"/"+tid).pipe(
     catchError((err: any) => {
       console.log(err);
       return throwError(
         () => new Error('ConstellationService.show(): error retrieving constellation: ' + err)
       );
     })
   );
 }


}
