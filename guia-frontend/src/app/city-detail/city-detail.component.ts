import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../services_/cityservice';
import { CityModel } from '../models_/citymodel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-detail.component.html',
  styleUrl: './city-detail.component.scss'
})
export class CityDetailComponent {

  city!: CityModel;
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private cityService: CityService
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
        },
        err => console.error('Error loading city:', err)
      );
    }
  }
}
