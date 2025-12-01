import { Component } from '@angular/core';
import { CityModel } from '../models_/citymodel';
import { CityService } from '../services_/cityservice';
import { NgFor, CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cities',
  imports: [CommonModule, NgFor],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss'
})
export class CitiesComponent {

  cities: CityModel[] = [];   // ✅ Nombre corregido
  token: string = '';

  constructor(private cityService: CityService, private router: Router) {
    const user = sessionStorage.getItem('user');

    if (user) {
      const info = JSON.parse(user);
      this.token = info.token;
      this.loadCities();        // 👈 cargar ciudades
    } else {
      console.error('No hay token, el usuario no está logueado');
    }
  }

  loadCities() {
    this.cityService.getall(this.token).subscribe(
      response => {
        this.cities = response;  // ✅ Guardar en "cities"
        console.log('Cities loaded:', this.cities);
      },
      error => {
        console.error('Failed to load cities:', error);
      }
    );
  }

  goToCity(name: string) {
    this.router.navigate(['/cities', name]);  // ✅ Ruta corregida
  }
}
