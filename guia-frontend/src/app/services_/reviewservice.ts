import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReviewComponent } from '../review/review.component';
import { ReviewModel } from '../models_/reviewmodel';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = 'http://localhost:8000/reviews';

  constructor(private http: HttpClient) {}

  getReviews(item_id: string) {
  return this.http.get<ReviewModel[]>(`${this.baseUrl}/${item_id}`);
}


  createReview(data: any, token: string) {
    return this.http.post(
      `${this.baseUrl}/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

}

