import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from '../models_/postsmodel';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:8000/posts';

  constructor(private http: HttpClient) {}

  // Crear un post (usa FormData porque enviamos archivo)
  createPost(formData: FormData, token: string) {
    return this.http.post(`${this.baseUrl}/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Obtener todos los posts
  getAllPosts() {
    return this.http.get<PostModel[]>(`${this.baseUrl}/`);
  }

  // Obtener posts filtrados por categoría
  getPostsByCategory(category: string) {
    return this.http.get<PostModel[]>(`${this.baseUrl}/category/${category}`);
  }

  // Obtener un post por ID
  getPostById(id: string) {
    return this.http.get<PostModel>(`${this.baseUrl}/${id}`);
  }
}
