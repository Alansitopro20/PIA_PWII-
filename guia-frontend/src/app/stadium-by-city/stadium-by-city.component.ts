import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StadiumModel } from '../models_/stadiumsmodel';
import { StadiumService } from '../services_/stadiumsservice';

@Component({
  selector: 'app-stadium-by-city',
  imports: [CommonModule],
  templateUrl: './stadium-by-city.component.html',
  styleUrl: './stadium-by-city.component.scss'
})
export class StadiumByCityComponent {
  
  stadiums:StadiumModel[]=[];
  city!:string;

  constructor(
    private route: ActivatedRoute,
    private stadiumService:StadiumService
  ){}

  ngOnInit(){
    this.city=this.route.snapshot.paramMap.get('city')||'';

    this.stadiumService.getStadiumsByCity(this.city).subscribe({
      next:(data)=>{
        this.stadiums=data;
        console.log("Stadiums loaded:",data);
      },
      error:(err)=>console.error("Error loading stadiums:", err)
    })
  }

}
