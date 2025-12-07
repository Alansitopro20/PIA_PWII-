import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../services_/cityservice';
import { CityModel } from '../models_/citymodel';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from '../review/review.component';
import { SafeUrlPipe } from '../pipe/safe-url.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-detail',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './city-detail.component.html',
  styleUrl: './city-detail.component.scss'
})
export class CityDetailComponent {

  city!: CityModel;
  token: string = '';
  currentImage = 0;
  currentDato: number = 0;



  constructor(
    private route: ActivatedRoute,
    private cityService: CityService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = sessionStorage.getItem('user');
    if (user) {
      const info = JSON.parse(user);
      this.token = info.token;
    }

    const name = this.route.snapshot.paramMap.get('name');

    if (name) {
      this.cityService.getCityByName(name).subscribe(
        city => {
          this.city = city;
          console.log('City detail:', this.city);
          console.log('VIDEO URL:', this.city.video_url);

        },
        err => console.error('Error loading city:', err)
      );
    }


    
  }


nextImage() {
  if (!this.city?.galeria) return;
  this.currentImage = (this.currentImage + 1) % this.city.galeria.length;
}

prevImage() {
  if (!this.city?.galeria) return;
  this.currentImage =
    (this.currentImage - 1 + this.city.galeria.length) %
    this.city.galeria.length;
}

goToImage(index: number) {
  this.currentImage = index;
}


prevDato() {
  if (!this.city?.dato_curioso) return;
  this.currentDato =
    (this.currentDato - 1 + this.city.dato_curioso.length) %
    this.city.dato_curioso.length;
}

nextDato() {
  if (!this.city?.dato_curioso) return;
  this.currentDato =
    (this.currentDato + 1) % this.city.dato_curioso.length;
}

goToDato(index: number) {
  this.currentDato = index;
}

goTo(section: string) {
   this.router.navigate([`/${section}/by_city`, this.city.name]);
}




}
