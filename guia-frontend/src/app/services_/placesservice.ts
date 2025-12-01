import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlaceModel } from '../models_/placesmodel';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class PlaceService{
    constructor(private http: HttpClient){  }
    getPlaces(){
            
    }

    getall(token: string) {
        return this.http.get<PlaceModel[]>(`http://localhost:8000/places/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
    }
    
    getallsintoken() {
        return this.http.get<PlaceModel[]>(`http://localhost:8000/places/`, {
          
        });
    }

    getPlaceByName(name: string): Observable<PlaceModel>{
      return this.http.get<PlaceModel>(`http://localhost:8000/places/${name}`)
    }
}