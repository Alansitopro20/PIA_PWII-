import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../services_/cityservice';
import { CityModel } from '../models_/citymodel';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../pipe/safe-url.pipe';
import { Router,RouterModule } from '@angular/router';
import { Userservice } from '../services_/userservice';


@Component({
  selector: 'app-city-detail',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe, RouterModule],
  templateUrl: './city-detail.component.html',
  styleUrl: './city-detail.component.scss'
})
export class CityDetailComponent {

  city!: CityModel;
  token: string = '';
  currentImage = 0;
  currentDato: number = 0;
  toastMessage: string | null = null;
  isFavorite: boolean = false;
  userId: string = '';
  toastMessageFav: string = '';



  constructor(
    private route: ActivatedRoute,
    private cityService: CityService,
    private router: Router,
    private userService:Userservice

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

          // Cargar favoritos
          this.checkIfFavorite();

        },
        err => console.error('Error loading city:', err)
      );
    }


    
  }

  // FAVORITOS

  showToast(msg: string) {
    this.toastMessage = msg;
    setTimeout(() => this.toastMessage = null, 3000);
  }

  checkIfFavorite() {
  if (!this.token) return;

  this.userService.getProfileFav(this.token).subscribe((res: any) => {

    this.isFavorite = res.favorites?.city?.includes(
      this.city.id.toString()
    ) ?? false;

  });
}

  toggleFavorite() {
    if (!this.token) return;

    const itemId = this.city.id.toString();

    if (!this.isFavorite) {
      this.userService.addFavorite('cities', itemId, this.city.name, this.token).subscribe(() => {
        this.isFavorite = true;
        this.showToast('Agregado a favoritos ❤️');
      });
    } else {
      this.userService.removeFavorite('cities', itemId, this.token).subscribe(() => {
        this.isFavorite = false;
        this.showToast('Eliminado de favoritos 💔');
      });
    }
  }

  // GALERIA 
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


  // DATOS CURIOSOS
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

  // SECCION DE IR A ...
  goTo(section: string) {
    this.router.navigate([`/${section}/by_city`, this.city.name]);
  }




}
