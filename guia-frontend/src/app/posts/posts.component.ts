import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../services_/postsservice';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {

  title: string = '';
  content: string = '';
  imageFile: File | null = null;

  constructor(private postService: PostService) {}

  // Cuando seleccionan la imagen
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  imageUrl: string | null = null;


  submitPost() {
    if (!this.title || !this.content || !this.imageFile) {
      alert('Faltan campos por llenar');
      return;
    }

    // Obtener token del localStorage (o de donde tú lo tengas)
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No hay token, inicia sesión');
      return;
    }

    // Armamos el FormData para el backend
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('content', this.content);
    formData.append('image', this.imageFile); // << imagen real

    // Llamamos al servicio
    this.postService.createPost(formData, token).subscribe({
      next: (res) => {
        console.log('Post creado:', res);
        alert('Post creado con éxito!');
        
        // opcional: limpiar campos
        this.title = '';
        this.content = '';
        this.imageFile = null;
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear el post');
      }
    });
  }
}
