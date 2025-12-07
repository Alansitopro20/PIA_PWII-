import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StayModel } from '../models_/staymodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StayService {

  private apiUrl = 'http://localhost:8000/stay';

  constructor(private http: HttpClient) {}

  // ===========================
  // 1️⃣ Obtener TODOS con token
  // ===========================
  getall(token: string): Observable<StayModel[]> {
    return this.http.get<StayModel[]>(`${this.apiUrl}/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }


  // ===================================
  // 2️⃣ Obtener TODOS sin requerir token
  // ===================================
  getallsintoken(): Observable<StayModel[]> {
    return this.http.get<StayModel[]>(`${this.apiUrl}/`);
  }


  // ====================================
  // 3️⃣ Obtener hospedaje por **nombre**
  // URL -> /stay/{name}
  // ====================================
  getStayByName(name: string): Observable<StayModel> {
    return this.http.get<StayModel>(`${this.apiUrl}/${name}`);
  }


  // =======================================
  // 4️⃣ Obtener hospedajes por **ciudad**
  // URL -> /stay/by_city/{ciudad}
  // =======================================

  getStaysByCity(city: string) {
  return this.http.get<StayModel[]>(`http://localhost:8000/stay/by_city/${city}`);
}


}
