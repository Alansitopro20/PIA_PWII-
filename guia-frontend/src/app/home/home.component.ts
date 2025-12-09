import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../services_/homeservice';
import { HomeData, CityCard, PlaceCard, StayCard } from '../models_/homemodel';
import { Router, RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  data: HomeData | null = null;
  loading = false;
  error: string | null = null;
  currentYear = new Date().getFullYear();

  constructor(private homeService: HomeService, private router: Router) {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = null;

    this.homeService.getHomeData().subscribe({
      next: (res) => { this.data = res; this.loading = false; },
      error: (err) => { 
        console.error(err);
        this.error = 'No se pudieron cargar los datos.'; 
        this.loading = false;
      }
    });
  }

  goToCity(city: CityCard) {
    this.router.navigate(['/cities', city.name]);  // rutas coinciden con app-routing
  }

  goToPlace(place: PlaceCard) {
    this.router.navigate(['/places', place.name]);
  }

  goToStay(stay: StayCard) {
    this.router.navigate(['/stay', stay.name]);
  }

  goToStadium(stadium: any) {
    this.router.navigate(['/stadium', stadium.name]); // ruta singular
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}


