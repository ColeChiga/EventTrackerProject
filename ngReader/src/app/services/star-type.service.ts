import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StarTypeService {

  private url = environment.baseUrl + "pi/stars";

  constructor(private http: HttpClient) {

   }
}
