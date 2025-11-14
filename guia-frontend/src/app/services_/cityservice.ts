import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CityModel } from '../models_/citymodel';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(private http: HttpClient) {  }

  getCities(){
    
  }

  getall(token: string) {
    return this.http.get<CityModel[]>(`http://localhost:8000/cities/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getallsintoken() {
    return this.http.get<CityModel[]>(`http://localhost:8000/cities/`, {
      
    });
  }
}
