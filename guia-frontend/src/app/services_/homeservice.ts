// src/app/home/services/home.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeData } from '../models_/homemodel';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  // Ajusta baseUrl si tu backend corre en otro sitio/puerto
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getHomeData(): Observable<HomeData> {
    // Ajusta estos endpoints en tu backend o crea un endpoint /home que devuelva todo
    return this.http.get<HomeData>(`${this.baseUrl}/home`); 
    // Alternativa (si no tienes /home): podrías hacer múltiples peticiones y combinarlas en el backend o con forkJoin en el frontend.
  }
}
