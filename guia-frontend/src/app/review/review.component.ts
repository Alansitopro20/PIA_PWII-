import { Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewService } from '../services_/reviewservice';
import { ReviewModel } from '../models_/reviewmodel';
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  encapsulation: ViewEncapsulation.None   // <---- AGREGAR ESTO
})

export class ReviewComponent {

  @Input() parentReviews: any[] = [];
  @Input() itemId!: number;  
  @Input() itemType!: string;
  @Output() refreshReviews = new EventEmitter<void>();


  reviewForm: FormGroup;
  reviews: any[] = [];
  token: string = '';

  loading=false; //booleano para respuesta del backend
  showError=false; //booleano para mensajes de error
  toastMessage: string | null = null;


  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService
  ) {
    this.reviewForm = this.fb.group({
      rating: [5, Validators.required],
      comment: ['', Validators.required],
    });
  }

  ngOnInit() {
  const user = sessionStorage.getItem('user');
    if (user) {
      const info = JSON.parse(user);
      this.token = info.token;   
    }
  }

  onRefreshReviews() {
    console.log("🔄 Evento recibido en StadiumDetailComponent");
    alert("StadiumDetailComponent recibió refreshReviews");

    this.loadReviews();
  }


  loadReviews() {
    this.reviewService
      .getReviews(this.itemId.toString())   // ✔️ SOLO 1 ARGUMENTO
      .subscribe(res => {
        this.reviews = res;
      });
  }

  // Funcion para mostrar los toast
  showToast(msg: string) {
    this.toastMessage = msg;
    setTimeout(() => this.toastMessage = null, 3000);
  }

  submitReview() {
  if (this.reviewForm.invalid) return;

  const formData = new FormData();
  formData.append("item_id", this.itemId.toString());
  formData.append("item_type", this.itemType);
  formData.append("rating", this.reviewForm.value.rating);
  formData.append("comentario", this.reviewForm.value.comment);

  this.reviewService.createReview(formData, this.token).subscribe({
    next: () => {
      //window.alert("Tu reseña se envió correctamente ✔");
      //console.log("EMITIENDO: refreshReviews");
      this.showToast("Tu reseña se envió correctamente ✔");

      this.reviewForm.reset({ rating: 5, comment: '' });
      this.loadReviews();
      
      this.refreshReviews.emit(); // <--- AHORA sí se envía al padre

    },
    error: () => {
            this.showToast("Error al enviar la reseña ❌");

      //window.alert("Error al enviar la reseña ❌");

    }
  });
}


  // PAGINACIÓN
  currentPage = 1;
  reviewsPerPage = 3;

  get paginatedReviews() {
    const start = (this.currentPage - 1) * this.reviewsPerPage;
    const end = start + this.reviewsPerPage;
    return this.parentReviews.slice(start, end);
  }

  nextPage() {
    if ((this.currentPage * this.reviewsPerPage) < this.parentReviews.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  

}
