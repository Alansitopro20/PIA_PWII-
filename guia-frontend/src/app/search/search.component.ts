import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SearchService } from '../services_/searchservice';
import { SearchModel } from '../models_/searchmodel';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  query = "";
  filter = "all";
  results: SearchModel | null = null;

  constructor(
    private searchService: SearchService,
    private router: Router

  ) {}

  onSearch() {
    if (this.query.length < 2) {
      this.results = null;
      return;
    }

    this.searchService.search(this.query, this.filter)
      .subscribe(res => {
        this.results = res;
      });
  }

  navigateTo(item: any, type: string) {
    switch (type) {
      case 'cities':
        this.router.navigate(['/city', item.name]);
        break;

      case 'places':
        this.router.navigate(['/places', item.name]);
        break;

      case 'stays':
        this.router.navigate(['/stay', item.name]);
        break;

      case 'stadiums':
        this.router.navigate(['/stadiums', item.name]);
        break;

      case 'reviews':
        this.router.navigate(['/review', item.name]);
        break;
    }
  }
}
