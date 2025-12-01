import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StayModel } from '../models_/staymodel';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StayService {
  constructor(private http: HttpClient) {  }

  getStays(){
    
  }

  getall(token: string) {
    return this.http.get<StayModel[]>(`http://localhost:8000/stay/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getallsintoken() {
    return this.http.get<StayModel[]>(`http://localhost:8000/stay/`, {
      
    });
  }

  getStayByName(name: string): Observable<StayModel> {
      return this.http.get<StayModel>(`http://localhost:8000/stay/${name}`);
    }
}