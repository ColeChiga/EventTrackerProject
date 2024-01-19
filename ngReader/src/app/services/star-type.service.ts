import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StarTypeService {

  private url = environment.baseUrl + "api/starTypes";

  constructor(private http: HttpClient) {

   }
}
