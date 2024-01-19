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

  constructor(private http: HttpClient) {

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

    return this.http.put<Star>(this.url+"/"+tid, star).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('StarService.show(): error retrieving star: ' + err)
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


  }
