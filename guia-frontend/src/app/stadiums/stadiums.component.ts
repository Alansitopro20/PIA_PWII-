import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StadiumModel } from '../models_/stadiumsmodel';
import { StadiumService } from '../services_/stadiumsservice';
import { response } from 'express';

@Component({
  selector: 'app-stadiums',
  imports: [CommonModule, NgFor],
  templateUrl: './stadiums.component.html',
  styleUrl: './stadiums.component.scss'
})
export class StadiumsComponent {
  stadiums: StadiumModel[] = [];   // ✅ Nombre corregido
  token:string='';

  constructor(private stadiumService: StadiumService, private router: Router) {
    const user = sessionStorage.getItem('user'); // ✅ Recuperar user del almacenamiento
    if (user) {
      const info = JSON.parse(user);
      this.token = info.token; // ✅ Obtener token
      this.loadStadiums(); // 👈 ¡Aquí se llama correctamente!
    } else {
      console.error('No hay token, el usuario no está logueado');
    }
  }


 loadStadiums() {
    this.stadiumService.getall(this.token).subscribe(
      response => {
        this.stadiums = response;
        console.log('Cities loaded:', this.stadiums);
      },
      error => {
        console.error('Failed to load stadiums:', error);
      }
    );
  }

  goToStadium(name: string) {
    this.router.navigate(['/stadium', name]);
  }

}
