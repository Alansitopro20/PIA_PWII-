import { Component } from '@angular/core';
import { Userservice } from '../services_/userservice';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Interfaz para favoritos
interface FavoriteItem {
  item_id: string;
  item_name: string;
  type: 'stay' | 'place' | 'stadium'| 'city';
  
}

@Component({
  selector: 'app-profile',
  imports: [NgIf, RouterModule, NgClass, NgFor, TitleCasePipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  information: any;
  token: string = '';
  profileData: any;
  loading: boolean = true;
  errorMsg: string = '';

favoritesArray: FavoriteItem[] = [];


  constructor(private userService: Userservice, private router: Router) {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.information = JSON.parse(user);
      this.token = this.information.token;
      this.loadProfile();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadProfile() {
    this.loading = true;
    this.userService.getProfileFav(this.token).subscribe({
      next: (profile) => {
        this.profileData = profile;

        // Combinar favoritos en un solo array para iterar fácilmente
        if (this.profileData.favorites) {
  this.profileData.favoritesArray = [
    ...(this.profileData.favorites?.stays || []).map((fav: { item_id: string; item_name: string }) => ({
      ...fav,
      type: 'stay'
    })),
    ...(this.profileData.favorites?.places || []).map((fav: { item_id: string; item_name: string }) => ({
      ...fav,
      type: 'place'
    })),
    ...(this.profileData.favorites?.stadiums || []).map((fav: { item_id: string; item_name: string }) => ({
      ...fav,
      type: 'stadium'
    }))
  ];
  console.log('Favoritos:', this.profileData.favoritesArray);
      this.loading = false;

} else {
  this.profileData.favoritesArray = [];
  console.log('El usuario no tiene favoritos.');
}


        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar el perfil:', error);
        this.loading = false;
        if (error.status === 401) {
          this.errorMsg = 'Sesión expirada. Redirigiendo al login...';
          setTimeout(() => {
            sessionStorage.clear();
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.errorMsg = 'Error al cargar el perfil.';
        }
      }
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  goToFavorite(fav: FavoriteItem) {
    if (fav.type === 'place') {
      this.router.navigate(['/place', fav.item_name]);
    } else if (fav.type === 'stay') {
      this.router.navigate(['/stay', fav.item_name]);
    } else if (fav.type === 'stadium') {
      this.router.navigate(['/stadium', fav.item_name]);
    }
  }

  toggleFavorite(stay: any) {
    this.userService.addFavorite(
      'stays',          // item_type
      stay.id,          // item_id
      stay.name,        // item_name
      this.token        // token
    ).subscribe({
      next: res => {
        console.log('Favorito agregado', res);
        // Recargar perfil para actualizar la lista de favoritos
        this.loadProfile();
      },
      error: err => {
        console.error('Error al agregar favorito', err);
      }
    });
  }
}
