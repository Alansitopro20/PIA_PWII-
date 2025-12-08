import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StayService } from '../services_/stayservice';
import { StayModel } from '../models_/staymodel';
import { Router } from '@angular/router';


@Component({
  selector: 'app-stay-by-city',
  imports: [CommonModule],
  templateUrl: './stay-by-city.component.html',
  styleUrl: './stay-by-city.component.scss'
})
export class StayByCityComponent {
  
  stays: StayModel[] = [];
  city!: string;

  constructor(
    private route: ActivatedRoute,
    private stayService: StayService,
    private router: Router

  ) {}

  ngOnInit() {
    this.city = this.route.snapshot.paramMap.get('city') || '';

    this.stayService.getStaysByCity(this.city).subscribe({
      next: (data) => {
        this.stays = data;
        console.log("Stays loaded:", data);
      },
      error: (err) => console.error("Error loading stays:", err)
    });
  }

  goToStayDetail(name: string) {
    this.router.navigate(['/stay', name]);
  }
}
