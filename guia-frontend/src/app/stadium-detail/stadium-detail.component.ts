import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StadiumModel } from '../models_/stadiumsmodel';
import { StadiumService } from '../services_/stadiumsservice';
import { ReviewService } from '../services_/reviewservice';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-stadium-detail',
  imports: [CommonModule, ReviewComponent],
  standalone: true,
  templateUrl: './stadium-detail.component.html',
  styleUrl: './stadium-detail.component.scss'
})
export class StadiumDetailComponent {

  
  stadium!: StadiumModel;
  token: string = '';
  reviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private stadiumService: StadiumService,
    private reviewService: ReviewService   // ⬅ NECESARIO
  ) {}

  ngOnInit() {
    const user = sessionStorage.getItem('user');
    if (user) {
      const info = JSON.parse(user);
      this.token = info.token;
    }

    const name = this.route.snapshot.paramMap.get('name');

    if (name) {
      this.stadiumService.getStadiumByName(name).subscribe(
        stadium => {
          this.stadium = stadium;
          console.log('Stadium detail:', this.stadium);

          // Cargar reseñas cuando ya se tiene el ID
          this.loadReviews();
        },
        err => console.error('Error loading stadium:', err)
      );
    }
  }

  // ✔ FUNCIÓN QUE TE FALTABA
  loadReviews() {
    if (!this.stadium?.id) return;

    this.reviewService.getReviews(this.stadium.id.toString()).subscribe({
      next: (res) => {
        this.reviews = res;
        console.log("Reviews cargadas en el padre:", this.reviews);
      },
      error: (err) => {
        console.error("Error cargando reviews en el padre:", err);
      }
    });
  }

  toastMessage: string | null = null;

showToast(msg: string) {
  this.toastMessage = msg;
  setTimeout(() => this.toastMessage = null, 3000);
}


  // Evento emitido desde el componente hijo
  onRefreshReviews() {
  this.showToast("Tu reseña se envió correctamente ✔");
    this.loadReviews();   // <----- FALTABA ESTO

}


}
