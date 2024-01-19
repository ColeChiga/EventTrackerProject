import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  private url = environment.baseUrl + "api/starTypes";

  constructor(private http: HttpClient) {

   }
}
