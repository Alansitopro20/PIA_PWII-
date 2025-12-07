import { Component } from '@angular/core';
import { PlaceService } from '../services_/placesservice';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlaceModel } from '../models_/placesmodel';
import { ReviewComponent } from '../review/review.component';
import { SafeUrlPipe } from '../pipe/safe-url.pipe';
import { ReviewModel } from '../models_/reviewmodel';
import { ReviewService } from '../services_/reviewservice';
import { Userservice } from '../services_/userservice';


@Component({
  selector: 'app-places-detail',
  standalone: true,
  imports: [CommonModule, ReviewComponent, SafeUrlPipe],
  templateUrl: './places-detail.component.html',
  styleUrl: './places-detail.component.scss'
})
export class PlacesDetailComponent {
    place!: PlaceModel;
    token: string = '';
    reviews: any[] = [];
    averageRating: number = 0;
    toastMessage: string | null = null;
    isFavorite: boolean = false;
    userId: string = '';
    toastMessageFav: string = '';
  
    constructor(
      private route: ActivatedRoute,
      private placeService: PlaceService,
      private reviewService: ReviewService,
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
        this.placeService.getPlaceByName(name).subscribe(
          place => {
            this.place = place;
            console.log('Place detail:', this.place);

            // Cargar reseñas cuando ya se tiene el ID
            this.loadReviews();
            this.checkIfFavorite();
          },
          err => console.error('Error loading place:', err)
        );
      }
    }


    loadReviews() {
    if (!this.place?.id) return;

    this.reviewService.getReviews(this.place.id.toString()).subscribe({
      next: (res) => {
        this.reviews = res;
        console.log("Reviews cargadas:", this.reviews);

        // ⬅ Cargar también el promedio
        this.reviewService
          .getAverageRating(this.place  .id.toString())
          .subscribe(avg => {
            this.averageRating = Number(avg.toFixed(1)); // ejemplo: 2.6
          });
      }
    });
  }

  showToast(msg: string) {
    this.toastMessage = msg;
    setTimeout(() => this.toastMessage = null, 3000);
  }


  // Evento emitido desde el componente hijo
  onRefreshReviews() {
    this.showToast("Tu reseña se envió correctamente ✔");
      this.loadReviews();  
  }

  // FAVORITOS
  checkIfFavorite() {
    if (!this.token) return;

    this.userService.getProfileFav(this.token).subscribe((res: any) => {

      this.isFavorite = res.favorites?.places?.includes(
        this.place.id.toString()
      ) ?? false;

    });
  }

  toggleFavorite() {
    if (!this.token) return;

    const itemId = this.place.id.toString();

    if (!this.isFavorite) {
      this.userService.addFavorite('places', itemId, this.token).subscribe(() => {
        this.isFavorite = true;
        this.showToast('Agregado a favoritos ❤️');
      });
    } else {
      this.userService.removeFavorite('places', itemId, this.token).subscribe(() => {
        this.isFavorite = false;
        this.showToast('Eliminado de favoritos 💔');
      });
    }
  }

}
