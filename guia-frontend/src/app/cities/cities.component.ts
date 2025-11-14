import { Component } from '@angular/core';
import { CityModel } from '../models_/citymodel';
import { CityService } from '../services_/cityservice';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cities',
  imports: [CommonModule, NgFor],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss'
})
export class CitiesComponent {
  city:Array<CityModel>=[]; 
  token:string='';

  constructor(private cityService: CityService, private router: Router) {
    const user = sessionStorage.getItem('user'); // ✅ Recuperar user del almacenamiento
    if (user) {
      const info = JSON.parse(user);
      this.token = info.token; // ✅ Obtener token
      this.loadCities(); // 👈 ¡Aquí se llama correctamente!
    } else {
      console.error('No hay token, el usuario no está logueado');
    }
  }


 loadCities() {
    this.cityService.getall(this.token).subscribe(
      cities => {
        this.city = cities;
        console.log('Cities loaded:', this.city);
      },
      error => {
        console.error('Failed to load cities:', error);
      }
    );
  }

  goToCity(id: string) {
    this.router.navigate(['/city', id]);
  }
}

