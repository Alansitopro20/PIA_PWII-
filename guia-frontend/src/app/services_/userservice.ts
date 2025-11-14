import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel, UserCredentials } from '../models_/usermodel';

@Injectable({
  providedIn: 'root'
})
export class Userservice {
  constructor(private http: HttpClient) {  }

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
}
