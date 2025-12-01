import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StadiumModel } from '../models_/stadiumsmodel';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class StadiumService{
    constructor (private http: HttpClient){ }

    getStadiums(){

    }

    getall(token: string) {
        return this.http.get<StadiumModel[]>(`http://localhost:8000/stadiums/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    
      getallsintoken() {
        return this.http.get<StadiumModel[]>(`http://localhost:8000/stadiums/`, {
          
        });
      }

      getStadiumByName(name: string): Observable<StadiumModel> {
          return this.http.get<StadiumModel>(`http://localhost:8000/stadiums/${name}`);
        }


}

