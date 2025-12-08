import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel, UserCredentials } from '../models_/usermodel';

@Injectable({
  providedIn: 'root'
})
export class Userservice {
  constructor(private http: HttpClient) {  }

    private API_URL = 'http://localhost:8000/users';


  createUser(userData: any) {
    return this.http.post('http://localhost:8000/users/create', userData);
  }
  login(credentials:UserCredentials) {
    return this.http.post('http://localhost:8000/users/login/', credentials);
  }
  getProfile(email: string, token: string) {
    return this.http.get(`http://localhost:8000/users/me/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getProfileFav(token: string) {
  return this.http.get(`http://localhost:8000/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}



   /** ---------------------------
   *         FAVORITOS
   *  --------------------------*/

  addFavorite(item_type: string, item_id: string, item_name: string, token: string) {
  return this.http.post(
    `${this.API_URL}/favorites/add`,
    { item_type, item_id, item_name },  // ✔ enviar item_name
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}


  removeFavorite(item_type: string, item_id: string, token: string) {
    return this.http.post(
      `${this.API_URL}/favorites/remove`,
      { item_type, item_id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  getFavorites(token: string) {
    return this.http.get(
      `${this.API_URL}/favorites`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
