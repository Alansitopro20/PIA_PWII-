import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StadiumModel } from '../models_/stadiumsmodel';
import { StadiumService } from '../services_/stadiumsservice';

@Component({
  selector: 'app-stadium-detail',
  imports: [CommonModule],
  templateUrl: './stadium-detail.component.html',
  styleUrl: './stadium-detail.component.scss'
})
export class StadiumDetailComponent {
    stadium!: StadiumModel;
    token: string = '';
  
    constructor(
      private route: ActivatedRoute,
      private stadiumService: StadiumService
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
           stadium=> {
            this.stadium = stadium;
            console.log('Stadium detail:', this.stadium);
          },
          err => console.error('Error loading stadium:', err)
        );
      }
    }
}
