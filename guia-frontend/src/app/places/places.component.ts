import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlaceModel } from '../models_/placesmodel';
import { PlaceService } from '../services_/placesservice';

@Component({
  selector: 'app-places',
  imports: [CommonModule, NgFor],
  templateUrl: './places.component.html',
  styleUrl: './places.component.scss'
})
export class PlacesComponent {
  places: PlaceModel[] = [];   // ✅ Nombre corregido
  token:string='';

  constructor(private placeService: PlaceService, private router: Router) {
    const user = sessionStorage.getItem('user'); // ✅ Recuperar user del almacenamiento
    if (user) {
      const info = JSON.parse(user);
      this.token = info.token; // ✅ Obtener token
      this.loadPlaces(); // 👈 ¡Aquí se llama correctamente!
    } else {
      console.error('No hay token, el usuario no está logueado');
    }
  }


 loadPlaces() {
    this.placeService.getall(this.token).subscribe(
      response => {
        this.places = response;
        console.log('Places loaded:', this.places);
      },
      error => {
        console.error('Failed to load places:', error);
      }
    );
  }

  goToPlace(name: string) {
    this.router.navigate(['/places', name]);
  }
}
