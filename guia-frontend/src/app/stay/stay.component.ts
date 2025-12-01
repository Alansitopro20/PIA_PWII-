import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StayModel } from '../models_/staymodel';
import { StayService } from '../services_/stayservice';
import { response } from 'express';

@Component({
  selector: 'app-stay',
  imports: [CommonModule, NgFor],
  templateUrl: './stay.component.html',
  styleUrl: './stay.component.scss'
})
export class StayComponent {

    stays: StayModel[] = [];   // ✅ Nombre corregido
    token:string='';
  
    constructor(private stayService: StayService, private router: Router) {
      const user = sessionStorage.getItem('user'); // ✅ Recuperar user del almacenamiento
      if (user) {
        const info = JSON.parse(user);
        this.token = info.token; // ✅ Obtener token
        this.loadStays(); // 👈 ¡Aquí se llama correctamente!
      } else {
        console.error('No hay token, el usuario no está logueado');
      }
    }
  
  
   loadStays() {
      this.stayService.getall(this.token).subscribe(
        response => {
          this.stays = response;
          console.log('Stays loaded:', this.stays);
        },
        error => {
          console.error('Failed to load stays:', error);
        }
      );
    }
  
    goToStay(name: string) {
      this.router.navigate(['/stay', name]);
    }
}
