import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlaceModel } from '../models_/placesmodel';
import { PlaceService } from '../services_/placesservice';

@Component({
  selector: 'app-place-by-city',
  imports: [CommonModule],
  templateUrl: './place-by-city.component.html',
  styleUrl: './place-by-city.component.scss'
})
export class PlaceByCityComponent {
  places: PlaceModel[]=[];
  city!: string;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService
  ){}

  ngOnInit(){
    this.city=this.route.snapshot.paramMap.get('city')||'';

    this.placeService.getPlaceByCity(this.city).subscribe({
      next:(data)=>{
        this.places=data;
        console.log("Places loaded",data);
      },
      error:(err)=>console.error("Error loading places:",err)
    });
  }

}
