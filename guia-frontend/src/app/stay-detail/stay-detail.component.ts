import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StayComponent } from '../stay/stay.component';
import { StayModel } from '../models_/staymodel';
import { StayService } from '../services_/stayservice';
import { ReviewComponent } from '../review/review.component';
import { ReviewService } from '../services_/reviewservice';
import { Userservice } from '../services_/userservice';


@Component({
  selector: 'app-stay-detail',
  standalone: true,
  imports: [CommonModule, ReviewComponent],
  templateUrl: './stay-detail.component.html',
  styleUrl: './stay-detail.component.scss'
})
export class StayDetailComponent {
    stay!: StayModel;
    token: string = '';
    reviews: any[] = [];
    averageRating: number = 0;
    toastMessage: string | null = null;
    isFavorite: boolean = false;
    userId: string = '';
    toastMessageFav: string = '';
  
    constructor(
      private route: ActivatedRoute,
      private stayService: StayService,
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
        this.stayService.getStayByName(name).subscribe(
          stay => {
            this.stay = stay;
            console.log('Stay detail:', this.stay);

            // Cargar 
            this.loadReviews();
            this.checkIfFavorite();
          },
          err => console.error('Error loading city:', err)
        );
      }
    }

    // ✔ FUNCIÓN QUE TE FALTABA
  loadReviews() {
    if (!this.stay?.id) return;

    this.reviewService.getReviews(this.stay.id.toString()).subscribe({
      next: (res) => {
        this.reviews = res;
        console.log("Reviews cargadas:", this.reviews);

        // ⬅ Cargar también el promedio
        this.reviewService
          .getAverageRating(this.stay.id.toString())
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
      this.loadReviews();   // <----- FALTABA ESTO
  }

  // FAVORITOS
  checkIfFavorite() {
  if (!this.token) return;

  this.userService.getProfileFav(this.token).subscribe((res: any) => {

    this.isFavorite = res.favorites?.stays?.includes(
      this.stay.id.toString()
    ) ?? false;

  });
}

  toggleFavorite() {
    if (!this.token) return;

    const itemId = this.stay.id.toString();

    if (!this.isFavorite) {
      this.userService.addFavorite('stays', itemId, this.token).subscribe(() => {
        this.isFavorite = true;
        this.showToast('Agregado a favoritos ❤️');
      });
    } else {
      this.userService.removeFavorite('stays', itemId, this.token).subscribe(() => {
        this.isFavorite = false;
        this.showToast('Eliminado de favoritos 💔');
      });
    }
  }
    
}
