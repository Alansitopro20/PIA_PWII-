import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StayComponent } from '../stay/stay.component';
import { StayModel } from '../models_/staymodel';
import { StayService } from '../services_/stayservice';

@Component({
  selector: 'app-stay-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stay-detail.component.html',
  styleUrl: './stay-detail.component.scss'
})
export class StayDetailComponent {
    stay!: StayModel;
    token: string = '';
  
    constructor(
      private route: ActivatedRoute,
      private stayService: StayService
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
          },
          err => console.error('Error loading city:', err)
        );
      }
    }
}
