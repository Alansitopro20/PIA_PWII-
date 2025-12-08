import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchModel } from '../models_/searchmodel';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'http://localhost:8000/search';

  constructor(private http: HttpClient) { }

  search(query: string, filter: string): Observable<SearchModel> {
    return this.http.get<SearchModel>(`${this.apiUrl}?query=${query}&filter=${filter}`);
  }
}
