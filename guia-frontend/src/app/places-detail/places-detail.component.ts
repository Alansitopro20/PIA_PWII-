import { Component } from '@angular/core';
import { PlacesComponent } from '../places/places.component';
import { PlaceService } from '../services_/placesservice';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlaceModel } from '../models_/placesmodel';

@Component({
  selector: 'app-places-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './places-detail.component.html',
  styleUrl: './places-detail.component.scss'
})
export class PlacesDetailComponent {
    place!: PlaceModel;
    token: string = '';
  
    constructor(
      private route: ActivatedRoute,
      private placeService: PlaceService
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
          },
          err => console.error('Error loading place:', err)
        );
      }
    }
}
